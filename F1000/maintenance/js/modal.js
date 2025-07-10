/*!
 * Modal
 */

F1000.Modal = function() {
  this.defaultSetup = {
    showCloseBtn: true
  };
};

F1000.Modal.prototype = {
  /**********
   * Getters and Setters
   **********/

  /**
   * Fetch the modal
   * @return {HTMLElement}  The modal
   */
  getModal() {
    return document.querySelector('.js-modal');
  },


  /**
   * Fetch the modal body
   * @return {HTMLElement}  The modal body
   */
  getModalBody() {
    const modal = this.getModal();

    if (!modal) {
      return;
    }

    return modal.querySelector('.js-modal-body');
  },


  /**
   * Fetch the modal close button
   * @return {HTMLElement}  The modal close button
   */
  getModalCloseBtn() {
    const modal = this.getModal();

    if (!modal) {
      return;
    }

    return modal.querySelector('.js-modal-close');
  },


  /**********
   * Methods
   **********/

  /**
   * Create the modal
   * @param {Object} userSetup  The chosen Modal setup options
   */
  create(userSetup) {
    const modal = this.getModal();

    // add it to the page if it doesn't exist
    if (!modal) {
      const template = F1000.CloneTemplate('templateModal');
      if (!template) {
        return false;
      }

      document.body.appendChild(template.firstElementChild);
    }

    this.setComponents();

    this.modalCloseBtn.addEventListener('click', () => { this.hide(); }, false);

    this.setup(userSetup);
  },

  /**
   * Destroy the modal
   */
  destroy() {
    const modal = this.getModal();

    if (!modal) {
      return false;
    }

    modal.remove();
    this.setComponents();
  },

  /**
   * Hide the modal
   */
  hide() {
    F1000.HideElement(this.getModal());
  },

  /**
   * Show the modal
   */
  show() {
    F1000.ShowElement(this.getModal());
  },


  /**********
   * Utility
   **********/

  /**
   * Set the variable references for the modal components
   */
  setComponents() {
    // this.modal = this.getModal();
    this.modalBody = this.getModalBody();
    this.modalCloseBtn = this.getModalCloseBtn();
  },

  /**
   * Setup the modal
   * @param {Object} userSetup  The chosen Modal setup options 
   */
  setup(userSetup) {
    const modal = this.getModal(),
      setup = extend(this.defaultSetup, userSetup);

    for (const className of modal.classList) {
      switch (className) {
        case 'o-modal':
        case 'js-modal':
        case F1000.Globals.Classes.HIDDEN:
          break;
        default:
          modal.classList.remove(className);
      }
    }

    if (setup.size) {
      modal.classList.add('o-modal--' + setup.size);
    }

    if (!setup.showCloseBtn) {
      F1000.HideElement(this.modalCloseBtn);
    }
  }
};
