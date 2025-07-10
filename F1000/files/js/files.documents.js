const FILE_TYPES = {
  PDF: 'application/pdf',
  WORD: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  XML: 'text/xml',
  ZIP: 'application/x-zip-compressed'
};

const DOCUMENT_CATEGORIES = {
  ALTERNATE: 'alternate',
  DATASET: 'dataset',
  MANUSCRIPT: 'manuscript',
  PLAGIARISM: 'plagiarism',
  SOURCE: 'source',
  SUPPLEMENTAL: 'supplemental'
};


class Documents extends Files {
  constructor() {
    super();

    this.MdlHelper = new F1000.MdlHelper();

    this.fileFormats = ['.doc', '.docx', '.rtf', '.pdf', '.xml', '.zip'];

    this.init();

    this.initDocuments();
  }


  initDocuments() {
    let fileCategory = document.querySelector('.js-file-category');

    if (fileCategory) {
      fileCategory.addEventListener('change', e => this.handleChangeEventDocuments(e), false);
    }
  }


  handleChangeEventDocuments(e) {
    this.showCategoryOptions(e.target.value.toUpperCase());
  }


  addFileToPage(index, form) {
    let formData = new FormData(form),
      fileCategory = formData.get('category'),
      file = this.uploadedFiles[index],
      menuTemplateId = 'templateMenu',
      entry, target, children;

    if (formData.get('category') === '') {
      return;
    }

    if (fileCategory === DOCUMENT_CATEGORIES.ALTERNATE) {
      if (file.type === FILE_TYPES.PDF) {
        menuTemplateId += 'ArticlePDF';
      } else if (file.type === F1000.Globals.FileTypes.XML) {
        menuTemplateId += 'ArticleXML';
      }
    } else {
      menuTemplateId += formData.get('category').capitalize();
    }


    target = document.querySelector('[data-file-category="' + fileCategory + '"] tbody');

    if (!target) {
      return false;
    }

    if (fileCategory === DOCUMENT_CATEGORIES.MANUSCRIPT) {
      // remove existing entry
      target.lastElementChild.remove();
    }

    // how many existing rows?
    children = target.children.length;


    entry = F1000.CloneTemplate('templateDocument').firstElementChild;
    
    if (!entry) {
      return;
    }

    // populate
    entry.querySelector('.js-file-date').innerText = moment(file.date).format('DD MMM YYYY');
    entry.querySelector('.js-file-name').innerText = file.name;
    entry.querySelector('.js-file-size').innerText = numeral(file.size).format('0.0b');

    // add menu items
    // console.log(F1000.CloneTemplate(menuTemplateId))
    entry.querySelector('.mdl-js-menu').appendChild(F1000.CloneTemplate(menuTemplateId));

    // set necessary attributes
    entry.querySelector('.mdl-js-button').id = fileCategory + '-' + (children + 1);
    entry.querySelector('.mdl-js-menu').setAttribute('data-mdl-for', fileCategory + '-' + (children + 1));

    // add new entry
    target.appendChild(entry);

    // use mdl-helper to enable menus
    this.MdlHelper.upgradeMultiple(target.lastElementChild.querySelectorAll(this.MdlHelper.getClassList()));
  
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
      this.showCategoryOptions();
      this.showFileDetails(index);
    // });
  }

  showFileDetails(index = 0) {
    let fileProcessForm = this.fileProcessOverlay.querySelector('form'),
      formEls = fileProcessForm.elements,
      fileDate = fileProcessForm.querySelector('.js-file-date'),
      fileName = fileProcessForm.querySelector('.js-file-name'),
      fileNumber = fileProcessForm.querySelector('.js-file-number'),
      fileSize = fileProcessForm.querySelector('.js-file-size');

    if (fileNumber) {
      fileNumber.innerText = 'File ' + (index + 1) + ' of ' + this.uploadedFiles.length;
      F1000.ShowElement(fileNumber);
    }

    if (fileName) {
      fileName.innerText = this.uploadedFiles[index].name;
    }

    if (fileDate) {
      fileDate.innerText = moment(this.uploadedFiles[index].date).format('YYYY-MM-DD @ HH:mm:ss');
    }

    if (fileSize) {
      fileSize.innerText = numeral(this.uploadedFiles[index].size).format('0.0b');
    }

    for (let formEl of formEls) {
      switch (formEl.tagName.toUpperCase()) {
        case 'BUTTON':
          formEl.setAttribute('data-index', index);

          if (formEl.dataset.action === 'file-process-done') {
            formEl.innerText = ((index + 1) === this.uploadedFiles.length) ? 'Done' : 'Next';
          }
          break;
        case 'SELECT':
          this.MdlHelper.selectChange(formEl, formEl.options[0].value);
          break;
        default:
          switch (formEl.type.toUpperCase()) {
            case 'CHECKBOX':
              this.MdlHelper.checkboxUncheck(formEl);
              break;
            case 'RADIO':
              this.MdlHelper.radioUncheck(formEl);
              break;
            default:
              this.MdlHelper.textfieldChange(formEl, '');
          }
      }
    }
  }

  showCategoryOptions(category = '') {
    var options = document.querySelectorAll('.js-file-option');

    for (let option of options) {
      if (option.dataset.related.toUpperCase().indexOf(category) > -1 && category !== '') {
        F1000.ShowElement(option);
      } else {
        F1000.HideElement(option);
      }
    }
  }
}

new Documents();
