/**
 * Helper class for MDL elements
 * The methods within allow various components to be modified programmatically
 */
F1000.MdlHelper = function() {};

F1000.MdlHelper.prototype = {
  /**
   * MDL class hashmap
   */
  classes: {
    BUTTON: 'mdl-button',
    CHECKBOX: 'mdl-checkbox',
    EXPANDINGSECTION: 'mdl-expandingsection',
    ICONTOGGLE: 'mdl-icon-toggle',
    PROGRESS: 'mdl-progress',
    RADIO: 'mdl-radio',
    SELECT: 'mdl-select',
    SPINNER: 'mdl-spinner',
    SWITCH: 'mdl-switch',
    TEXTFIELD: 'mdl-textfield',
    TOOLTIP: 'mdl-tooltip'
  },

  /**
   * Returns a list of MDL classes
   * @return {String}  A CSV list of the MDL classes
   */
  getClassList: function() {
    var classList = '';

    for (var key in this.classes) {
      classList += ',.' + this.classes[key];
    }
    return classList.substring(1);
  },

  /**********
   * Methods
   **********/

  /**
   * Toggle the check status of a checkbox on
   * @param {Object} el  The element to be modified
   */
  checkboxCheck: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialCheckbox.check();
  },

  /**
   * Disable a checkbox
   * @param {Object} el  The element to be disabled
   */
  checkboxDisable: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialCheckbox.disable();
  },

  /**
   * Enable a checkbox
   * @param {Object} el  The element to be disabled
   */
  checkboxEnable: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialCheckbox.enable();
  },

  /**
   * Toggle the check status of a checkbox off
   * @param {Object} el  The element to be modified
   */
  checkboxUncheck: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialCheckbox.uncheck();
  },


  /**
   * Toggle the check status of an icon toggle on
   * @param {Object} el  The element to be modified
   */
  iconToggleCheck: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialIconToggle.check();
  },

  /**
   * Toggle the check status of an icon toggle off
   * @param {Object} el  The element to be modified
   */
  iconToggleUncheck: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialIconToggle.uncheck();
  },


  /**
   * Toggle the check status of a radio on
   * @param {Object} el  The element to be modified
   */
  radioCheck: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialRadio.check();
  },

  /**
   * Disable a radio
   * @param {Object} el  The element to be disabled
   */
  radioDisable: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialRadio.disable();
  },

  /**
   * Enable a radio
   * @param {Object} el  The element to be disabled
   */
  radioEnable: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialRadio.enable();
  },

  /**
   * Toggle the check status of a radio off
   * @param {Object} el  The element to be modified
   */
  radioUncheck: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialRadio.uncheck();
  },


  /**
   * Change the selected option of a select element
   * @param {Object} el     The element to be modified
   * @param {String} value  The value to be selected
   */
  selectChange: function(el, value) {
    if (!el) {
      return;
    }

    if (value === undefined) {
      value = el.options[0].value;
    }

    el.parentNode.MaterialSelect.change(value);
  },

  /**
   * Disable a select
   * @param {Object} el  The element to be disabled
   */
  selectDisable: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialSelect.disable();
  },

  /**
   * Enable a select
   * @param {Object} el  The element to be disabled
   */
  selectEnable: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialSelect.enable();
  },


  /**
   * Show the snackbar
   * @param {Object} el       The element to be modified
   * @param {String} message  The message to be shown
   */
  snackbar: function(el, message) {
    if (!el) {
      return;
    }

    el.MaterialSnackbar.showSnackbar({
      message: message
    });
  },


  /**
   * Toggle the check status of a switch on
   * @param {Object} el  The element to be modified
   */
  switchOn: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialSwitch.on();
  },

  /**
   * Toggle the check status of a switch off
   * @param {Object} el  The element to be modified
   */
  switchOff: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialSwitch.off();
  },


  /**
   * Change the value of a text field
   * @param {Object} el   The element to be modified
   * @param {String} txt  The text to insert in to the text field
   */
  textfieldChange: function(el, txt) {
    if (!el) {
      return;
    }

    if (txt === undefined) {
      txt = '';
    }

    el.parentNode.MaterialTextfield.change(txt);
  },

  /**
   * Disable a text field
   * @param {Object} el  The element to be disabled
   */
  textfieldDisable: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialTextfield.disable();
  },

  /**
   * Enable a text field
   * @param {Object} el  The element to be disabled
   */
  textfieldEnable: function(el) {
    if (!el) {
      return;
    }

    el.parentNode.MaterialTextfield.enable();
  },


  /**
   * Downgrade a MDL element
   * Useful when cloning a node
   * @param {Object} el  The element to be modified
   */
  downgradeSingle: function(el) {
    if (!el) {
      return;
    }

    el.setAttribute('data-upgraded', '');
    el.classList.remove('is-upgraded');
  },

  /**
   * Downgrade multiple MDL elements
   * Useful when cloning a nodeset
   * @param {Object} els  The elements to be modified
   */
  downgradeMultiple: function(els) {
    var thisObj = this;

    if (!els) {
      return;
    }

    Array.prototype.forEach.call(els, function(el) {
      thisObj.downgradeSingle(el);
    });
  },


  /**
   * Upgrade an MDL element
   * When an element is added to the DOM it doesn't automatically pick up the MDL functionality. Use this to ensure that it does.
   * @param {Object} el  The element to be modified
   */
  upgradeSingle: function(el) {
    if (!el) {
      return;
    }

    componentHandler.upgradeElement(el)
  },

  /**
   * Upgrade a set of MDL elements
   * When elements are added to the DOM they don't automatically pick up the MDL functionality. Use this to ensure that they do.
   * @param {Object} els  The elements to be modified
   */
  upgradeMultiple: function(els) {
    if (!els) {
      return;
    }

    componentHandler.upgradeElements(els)
  },
};
