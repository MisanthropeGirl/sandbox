class Files {
  constructor() {
    this.uploadedFiles = [];
  }

  get buttons() {
    return document.querySelectorAll('button[data-action^="file"]');
  }

  get fileProcessOverlay() {
    return document.querySelector('.js-overlay-process');
  }

  get uploadOverlay() {
    return document.querySelector('.js-overlay-upload');
  }

  get uploadInput() {
    return document.querySelector('.js-upload-input');
  }


  init() {
    // button event listeners
    for (let button of this.buttons) {
      button.addEventListener('click', e => this.handleClickEvent(e), false);
    }

    // set up file drag-and-drop
    if (this.uploadOverlay) {
      this.uploadOverlay.addEventListener('dragend', e => this.handleUploadDragEnd(e), false);
      this.uploadOverlay.addEventListener('dragover', e => this.handleUploadDragOver(e), false);
      this.uploadOverlay.addEventListener('drop', e => this.handleUploadDrop(e), false);
    }

    // // files input event listener
    if (this.uploadInput) {
      this.uploadInput.accept = this.fileFormats.join(',');
      this.uploadInput.addEventListener('change', e => this.handleChangeEvent(e), false);
    }
  }

  handleChangeEvent(e) {
    e.preventDefault();

    this.uploadedFiles = this.uploadInput.files;

    this.startFileUpload();
  }

  handleClickEvent(e) {
    let el = e.target,
      btn = el.closest('button'),
      action;

    if (!btn) {
      return;
    }

    action = btn.dataset.action;

    if (action.indexOf('file-') === -1) {
      return;
    }

    switch (action) {
      case 'file-process-cancel':
        this.cancelFileUpload(btn.dataset.index);
        break;
      case 'file-process-done':
        this.confirmFileUpload(btn.dataset.index);
        break;
      case 'file-upload-browse':
        this.showManualSelect();
        break;
      case 'file-upload-cancel':
        this.hideUploadOverlay();
        break;
      case 'file-upload-open':
        this.showUploadOverlay();
        break;
    }
  }

  handleUploadDragEnd(e) {
    let dt = e.dataTransfer;

    if (dt.items) {
      // Use DataTransferItemList interface to remove the drag data
      for (let i = 0, len = dt.items.length; i < len; i++) {
        dt.items.remove(i);
      }
    } else {
      // Use DataTransfer interface to remove the drag data
      e.dataTransfer.clearData();
    }
  }

  handleUploadDragOver(e) {
    e.preventDefault();
  }

  handleUploadDrop(e) {
    e.preventDefault();

    let dt = e.dataTransfer,
      files = [];

    if (dt.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0, len = dt.items.length; i < len; i++) {
        if (dt.items[i].kind == "file") {
          files.push(dt.items[i].getAsFile());
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      files = dt.files;
    }

    this.uploadedFiles = files;

    this.fileUploadStart();
  }


  cancelFileUpload(index) {
    let files = [];

    index = parseInt(index);

    // construct new object without this index
    for (let file of this.uploadedFiles) {
      if (file !== this.uploadedFiles[index]) {
        files.push(this.uploadedFiles[index]);
      }
    }

    // update master copy
    this.uploadedFiles = files;

    this.nextFileUpload(index);
  }

  confirmFileUpload(index) {
    let fileProcessForm = this.fileProcessOverlay.querySelector('form');

    if (!fileProcessForm.reportValidity()) {
      return;
    }

    if (this.addFileToPage(fileProcessForm)) {
      this.nextFileUpload(parseInt(index) + 1);
    }
  }

  finishFileUpload() {
    this.uploadInput.value = '';
    this.uploadedFiles = [];
    this.hideFileProcessOverlay();
    this.hideUploadOverlay();
  }

  nextFileUpload(index) {
    if (index < this.uploadedFiles.length) {
      this.processFile(index);
    } else {
      this.finishFileUpload();
    }
  }

  startFileUpload() {
    if (this.uploadedFiles.length === 0) {
      this.finishFileUpload();
      return;
    }

    this.showFileProcessOverlay();
    this.processFile(0);
  }


  hideFileProcessOverlay() {
    F1000.HideElement(this.fileProcessOverlay);
  }

  hideUploadOverlay() {
    F1000.HideElement(this.uploadOverlay);
  }

  showManualSelect() {
    this.uploadInput.click();
  }

  showFileProcessOverlay() {
    F1000.ShowElement(this.fileProcessOverlay);
  }

  showUploadOverlay() {
    F1000.ShowElement(this.uploadOverlay);
  }
}
