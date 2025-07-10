class Correspondence extends Files {
  constructor() {
    super();

    this.MdlHelper = new F1000.MdlHelper();

    this.fileFormats = ['.eml', '.msg'];

    this.init();
  }

  addFileToPage(form) {
     let formData = new FormData(form),
      type, author, sender, recipient, subject, datetime,
      authorNames, authorFirst, authorLast,
      correspondenceSection, correspondenceTable, entry,
      newAuthor = false, inserted = false;

    // which section is it being added to?
    type = formData.get('type');
    correspondenceSection = document.querySelector('[data-correspondence-type="' + type + '"]');

    // which author is it being added to?
    author = formData.get('author');
    correspondenceTable = (type === 'miscellaneous') ? correspondenceSection.querySelector('table') : correspondenceSection.querySelector('table[data-author="' + author.toLowerCase().replace(' ', '-').replace('\'', '') +  '"]');

    if (!correspondenceTable) {
      correspondenceTable = F1000.CloneTemplate('templateTable').firstElementChild;

      correspondenceTable.setAttribute('author', author.toLowerCase().replace(' ', '-').replace('\'', ''));

      correspondenceTable.caption.querySelector('a').visibility = 'hidden';
      correspondenceTable.caption.querySelector('a').nextElementSibling.innerText = author;

      newAuthor = true;
    }

    // contruct entry
    entry = F1000.CloneTemplate('templateTableRow').firstElementChild;

    if (!entry) {
      return false;
    }

    datetime = moment(formData.get('datetime'));

    entry.setAttribute('data-timestamp', datetime.unix());
    entry.firstElementChild.innerText = formData.get('sender');
    entry.querySelector(':nth-child(2)').innerText = formData.get('recipient');
    entry.querySelector(':nth-child(3)').innerText = formData.get('subject');
    entry.querySelector(':nth-child(4)').innerText = datetime.format('D MMMM YYYY @ HH:mm');

    if (correspondenceTable.tBodies[0].rows.length === 0) {
      correspondenceTable.tBodies[0].appendChild(entry);
    } else {
      for (let row of correspondenceTable.tBodies[0].rows) {
        if (inserted) {
          continue;
        }

        if (parseInt(row.dataset.timestamp) < datetime.unix()) {
          row.insertAdjacentElement('beforebegin', entry);
          inserted = true;
        }
      }

      correspondenceTable.setAttribute('data-updated', true);
    }
    this.MdlHelper.upgradeMultiple(entry.querySelectorAll(this.MdlHelper.getClassList()));

    if (newAuthor) {
      authorNames = author.split(' ');
      authorFirst = authorNames[0].toLowerCase().replace('\'', '');
      authorLast = authorNames[authorNames.length - 1].toLowerCase().replace('\'', '');

      inserted = false;

      for (let table of correspondenceSection.querySelectorAll('table')) {
        if (inserted) {
          continue;
        }

        if (authorLast < table.dataset.authorLastname && authorFirst < table.dataset.authorFirstname) {
          table.insertAdjacentElement('beforebegin', correspondenceTable);
          this.MdlHelper.upgradeMultiple(correspondenceTable.querySelectorAll(this.MdlHelper.getClassList()));
          inserted = true;
        }
      }
    }

    return true;
  }

  processFile(index = 0) {
    index = parseInt(index);

    if (this.uploadedFiles[index] === undefined) {
      // consider all files processed, close all overlays
      this.hideFileProcessOverlay();
      this.hideUploadOverlay();
      return;
    }

    // $.ajax({
    //   url: '/path/to/file',
    // })
    // .done(function() {
    //   console.log("success");
    // })
    // .fail(function() {
    //   console.log("error");
    // })
    // .always(function(data) {
      // this.showFileDetails(true, index);
      this.showFileDetails(true, index, {
        'type': 'referee',
        'author': 'Kip Moore',
        'sender': 'booking@c2c-countrytocountry.com',
        'recipient': 'kip@kipmoore.net',
        'subject': 'Re: C2C 2021 [Gates-ARTID1234-R]',
        'datetime': moment()
      });
    // });
  }

  showFileDetails(processed, index = 0, data = {}) {
    let fileProcessForm = this.fileProcessOverlay.querySelector('form'),
      formEls = fileProcessForm.elements,
      fileNumber = fileProcessForm.querySelector('.js-file-number'),
      fileName = fileProcessForm.querySelector('.js-file-name');

    if (fileNumber) {
      fileNumber.innerText = 'File ' + (index + 1) + ' of ' + this.uploadedFiles.length;
      F1000.ShowElement(fileNumber);
    }

    if (fileName) {
      fileName.innerText = (data.name) ? data.name : this.uploadedFiles[index].name;
    }

    for (let formEl of formEls) {
      switch (formEl.tagName.toUpperCase()) {
        case 'BUTTON':
          formEl.setAttribute('data-index', index);

          if (formEl.dataset.action === 'file-process-done') {
            formEl.innerText = ((index + 1) === this.uploadedFiles.length) ? 'Done' : 'Next';
          }
          break;
        case 'CHECKBOX':
          this.MdlHelper.checkboxUncheck(formEl);
          break;
        case 'RADIO':
          this.MdlHelper.radioUncheck(formEl);
          break;
        case 'SELECT':
          this.MdlHelper.selectChange(formEl, (data[formEl.name]) ? data[formEl.name] : formEl.options[0].value);
          break;
        default:
          if (data[formEl.name]) {
            switch (formEl.type) {
              case 'date':
                this.MdlHelper.textfieldChange(formEl, moment(data[formEl.name]).format('YYYY-MM-DD'));
                break;
              case 'datetime-local':
                this.MdlHelper.textfieldChange(formEl, moment(data[formEl.name]).format('YYYY-MM-DDTHH:mm'));
                break;
              case 'month':
                this.MdlHelper.textfieldChange(formEl, moment(data[formEl.name]).format('YYYY-MM'));
                break;
              case 'time':
                this.MdlHelper.textfieldChange(formEl, moment(data[formEl.name]).format('HH:mm'));
                break;
              case 'week':
                this.MdlHelper.textfieldChange(formEl, moment(data[formEl.name]).format('YYYY-[W]WW'));
                break;
              default:
                this.MdlHelper.textfieldChange(formEl, data[formEl.name]);
            }
          } else {
            this.MdlHelper.textfieldChange(formEl);
          }
      }
    }
  }
}

new Correspondence();
