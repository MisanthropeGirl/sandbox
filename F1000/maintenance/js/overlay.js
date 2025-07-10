/*!
 * Overlay
 */

F1000.Overlay = function() {};

F1000.Overlay.prototype = {
  /**********
   * Getters and Setters
   **********/

  /**
   * Fetch the overlay
   * @return {element}  The overlay
   */
  getOverlay() {
    return document.querySelector('.js-overlay');
  },


  /**********
   * Methods
   **********/

  /**
   * Create the overlay
   */
  create() {
    // no point in proceeding if it has already been added to the page
    if (this.getOverlay()) {
      return false;
    }

    const template = F1000.CloneTemplate('templateOverlay');
    if (!template) {
      return false;
    }

    document.body.appendChild(template.firstElementChild);
  },

  /**
   * Destroy the overlay
   */
  destroy() {
    if (!this.getOverlay()) {
      return false;
    }

    this.getOverlay().remove();
  },

  /**
   * Hide the overlay
   */
  hide() {
    F1000.HideElement(this.getOverlay());
  },

  /**
   * Show the overlay
   */
  show() {
    F1000.ShowElement(this.getOverlay());
  }
};
