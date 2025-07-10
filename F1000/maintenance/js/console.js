/*!
 * Console
 */

F1000.Console = function() {
  this.Overlay = new F1000.Overlay();
  this.Modal = new F1000.Modal();

  this.defaultSetup = {
    header: {
      show: true,
      title: {
        text: 'Console'
      }
    },
    fixed: {
      show: false
    },
    error: {
      show: false
    },
    footer: {
      show: true,
      buttons: {
        add: {
          show: false,
          text: 'Add',
          action: 'console-add'
        },
        close: {
          show: true,
          text: 'Close',
          action: 'console-close'
        },
        reset: {
          show: false,
          text: 'Reset',
          action: 'console-reset'
        }
      }
    }
  };

  this.setComponents();
};

F1000.Console.prototype = {
  /**********
   * Getters and Setters
   **********/

  /**
   * Fetch the console
   * @return {HTMLElement}  The console
   */
  getConsole() {
    return document.querySelector('.js-console');
  },


  /**
   * Fetch the console body
   * @return {HTMLElement}  The console body
   */
  getConsoleBody() {
    if (!this.console) {
      return;
    }

    return this.console.querySelector('.js-console-body');
  },


  /**
   * Fetch the console add button
   * @return {HTMLElement}  The console add button
   */
  getConsoleBtnAdd() {
    if (!this.console) {
      return;
    }

    return this.console.querySelector('.js-console-add');
  },

  /**
   * Fetch the console close button
   * @return {HTMLElement}  The console close button
   */
  getConsoleBtnClose() {
    if (!this.console) {
      return;
    }

    return this.console.querySelector('.js-console-close');
  },

  /**
   * Fetch the console reset button
   * @return {HTMLElement}  The console reset button
   */
  getConsoleBtnReset() {
    if (!this.console) {
      return;
    }

    return this.console.querySelector('.js-console-reset');
  },

  /**
   * Fetch the console fixed element
   * @return {HTMLElement}  The console fixed element
   */
  getConsoleFixed() {
    if (!this.console) {
      return;
    }

    return this.console.querySelector('.js-console-fixed');
  },

  /**
   * Fetch the console error
   * @return {HTMLElement}  The console error
   */
  getConsoleError() {
    if (!this.console) {
      return;
    }

    return this.console.querySelector('.js-console-error');
  },

  /**
   * Fetch the console footer
   * @return {HTMLElement}  The console footer
   */
  getConsoleFooter() {
    if (!this.console) {
      return;
    }

    return this.console.querySelector('.js-console-footer');
  },

  /**
   * Fetch the console header
   * @return {HTMLElement}  The console footer
   */
  getConsoleHeader() {
    if (!this.console) {
      return;
    }

    return this.console.querySelector('.js-console-header');
  },

  /**
   * Fetch the console title
   * @return {HTMLElement}  The console title
   */
  getConsoleTitle() {
    if (!this.console) {
      return;
    }

    return this.console.querySelector('.js-console-title');
  },


  /**********
   * Methods
   **********/

  /**
   * Close the console
   * Destroy the current console then hide the modal and overlay
   */
  close() {
    this.destroy();
    this.Modal.hide();
    this.Overlay.hide();
  },

  /**
   * Create and setup the console, creating and setting up the overlay, modal along the way
   * @param {Object} setupModal    Modal setup options
   * @param {Object} setupConsole  Console setup options
   */
  create(setupModal = {}, setupConsole = {}) {
    // create overlay
    this.Overlay.create();

    // create modal
    this.Modal.create(setupModal);

    if (this.console) {
      this.setup(setupConsole);
      return false;
    }

    let template = F1000.CloneTemplate('templateConsole');

    if (!template) {
      return false;
    }

    this.Modal.modalBody.appendChild(template.firstElementChild);

    this.setComponents();

    this.setup(setupConsole);
  },

  /**
   * Destroy the console
   */
  destroy() {
    if (!this.console) {
      return false;
    }

    F1000.RemoveElement(this.console);
    this.setComponents();
  },

  /**
   * Show the console
   */
  show() {
    // show overlay
    this.Overlay.show();

    // show modal
    this.Modal.show();
  },

  /**
   * Hide the console error message
   */
  hideError() {
    this.consoleError.classList.add('u-invisible')
    this.consoleError.querySelector('.js-console-error-body').innerText = 'Error';
  },

  /**
   * Show the console error message
   * @param {String|HTMLElement} msg  The error message to show
   */
  showError(msg) {
    if (msg instanceof HTMLElement) {
      this.consoleError.querySelector('.js-console-error-body').appendChild(msg);
    } else {
      this.consoleError.querySelector('.js-console-error-body').innerText = msg;
    }
    this.consoleError.classList.remove('u-invisible')
  },


  /**********
   * Utility
   **********/

  /**
   * Set the variable references for the console components
   */
  setComponents() {
    this.console = this.getConsole();
    this.consoleHeader =  this.getConsoleHeader();
    this.consoleTitle =  this.getConsoleTitle();
    this.consoleBody =  this.getConsoleBody();
    this.consoleError =  this.getConsoleError();
    this.consoleFixed =  this.getConsoleFixed();
    this.consoleFooter =  this.getConsoleFooter();
    this.consoleBtnAdd =  this.getConsoleBtnAdd();
    this.consoleBtnClose =  this.getConsoleBtnClose();
    this.consoleBtnReset =  this.getConsoleBtnReset();
  },

  /**
   * Setup the console
   * @param {Object} userSetup  The chosen console setup options 
   */
  setup(userSetup) {
    let setup = extend(true, this.defaultSetup, userSetup);

    // console
    this.console.classList.remove(this.console.className.split(' ')); // remove all
    this.console.classList.add('c-console', 'js-console'); // add the essentials back in

    if (setup.css) {
      this.console.classList.add(setup.css); // and any use specific classes
    }

    // header
    if (!setup.header.show) {
      F1000.HideElement(this.consoleHeader)
    }

    // header / title
    this.consoleTitle.innerText = setup.header.title.text;

    // fixed
    if (!setup.fixed.show) {
      F1000.HideElement(this.consoleFixed);
    }

    // error
    if (!setup.error.show) {
      F1000.HideElement(this.consoleError);
    }

    // footer
    if (!setup.footer.show) {
      F1000.HideElement(this.consoleFooter);
    }

    // footer / buttons / add
    if (!setup.footer.buttons.add.show) {
      F1000.HideElement(this.consoleBtnAdd);
    }
    this.consoleBtnAdd.innerText = setup.footer.buttons.add.text;
    this.consoleBtnAdd.setAttribute('data-action', setup.footer.buttons.add.action);

    // footer / buttons / close
    if (!setup.footer.buttons.close.show) {
      F1000.HideElement(this.consoleBtnClose);
    }
    this.consoleBtnClose.innerText = setup.footer.buttons.close.text;
    this.consoleBtnClose.setAttribute('data-action', setup.footer.buttons.close.action);

    // footer / buttons / reset
    if (!setup.footer.buttons.reset.show) {
      F1000.HideElement(this.consoleBtnReset);
    }
    this.consoleBtnReset.innerText = setup.footer.buttons.reset.text;
    this.consoleBtnReset.setAttribute('data-action', setup.footer.buttons.reset.action);

    // footer / buttons / dataset (all items are added to add buttons)
    if (setup.footer.buttons.dataset) {
      for (data of setup.footer.buttons.dataset) {
        this.consoleBtnAdd.setAttribute('data-' + data.name, data.value);
        this.consoleBtnClose.setAttribute('data-' + data.name, data.value);
        this.consoleBtnReset.setAttribute('data-' + data.name, data.value);
      }
    }
  }
};
