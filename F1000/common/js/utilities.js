'use strict';

/*!
 * Handy functions
 * Please keep this file old skool as it is used on the user site and not everyone has IE11 (or an evergreen browser) yet
 */

/**
 * Insert word break opportunity element <wbr /> into a string before a choosen character
 * @param {String} string  The string which may need to wrap
 * @param {String} char    The character to wrap at
 */
F1000.AllowStringWrappingAtCharacter = function(string, char) {
  if (string.indexOf(char) === -1) {
    return string;
  }

  return string.split(char).join(char + '<wbr />');
};


/**
 * Clone a template
 * @param  {String}  templateId  The template id
 * @return {Element}             The contents of the template
 */
F1000.CloneTemplate = function(id) {
  var template = document.getElementById(id);

  if (!template) {
    return;
  }

  if (template.tagName.toUpperCase() === 'TEMPLATE') {
    // new style
    return document.importNode(template.content, true);
  } else {
    // old skool (for public sites where IE has to be supported)
    return template.cloneNode(true).firstElementChild;
  }
};


/**
 * Copy some content to the clipboard
 * @param {Nodeset} content  The content (styling via markup included) to be copied to the clipboard
 */
F1000.CopyToClipboard = function(content) {
  var el = document.createElement('div');
  el.innerHTML = content;
  document.body.appendChild(el);

  var range;

  if (document.selection) { // IE
    range = document.body.createTextRange();
    range.moveToElementText(el);
    range.select();
  } else if (window.getSelection) {
    range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }

  try {
    document.execCommand('copy');
    document.body.removeChild(el);
    return true;
  }
  catch (e) {
    document.body.removeChild(el);
    return false;
  }
};


/**
 * Disable an element
 * @param {HTMLElement} el  The element to disable
 */
F1000.DisableElement = function(el) {
  if (!el) {
    return;
  }

  el.disabled = true;
};


/**
 * Empty an element
 * @param {HTMLElement} el  The element to be emptied
 */
F1000.EmptyElement = function(el) {
  if (!el) {
    return;
  }

  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
};


/**
 * Enable an element
 * @param {HTMLElement} el  The element to enable
 */
F1000.EnableElement = function(el) {
  if (!el) {
    return;
  }

  el.disabled = false;
};


/**
 * Fetch a particular element within a given container
 * @param  {HTMLElement}  container  The container to look in
 * @param  {String}       selector   The path of the field to look for
 * @return {HTMLElement}             The found element
 */
F1000.FetchElement = function(container, selector) {
  container = container || document;
  if (!container || selector === undefined) {
    return;
  }

  return container.querySelector(selector);
};


/**
 * The 'closest' API doesn't yet have great enough coverage (IE) to be used standalone.
 * This polyfill (which should, perhaps, be used with one for 'matches') deals with that.
 * Taken from https://stackoverflow.com/a/42873108
 * @param  {HTMLElement} el   The element whose ancestor is sought
 * @param  {String}      sel  The selector of the ancestor
 * @return {Element}          The requested ancestor element || null
 */
F1000.FindAncestor = function(el, sel) {
  if (el && sel.length > 0) {
    if (typeof el.closest === 'function') {
      return el.closest(sel) || null;
    }

    while (el) {
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      if (el.matches(sel)) {
        return el;
      }
      el = el.parentElement;
    }
  }

  return null;
};


/**
 * Fetch all the siblings of an element
 * @param  {HTMLElement} el  The element to find the siblings of
 * @return {Array}           The nodeset
 */
F1000.GetSiblings = function(el) {
  var filtered = [];

  if (el && el.parentNode) {
    [].forEach.call(el.parentNode.children, function(child) {
      if (child !== el) {
        filtered.push(child);
      }
    });
  }

  return filtered;
};


/**
 * Fetch all the siblings of an element
 * @param  {HTMLElement} el  The element to find the siblings of
 * @return {HTMLElement}     The nodeset
 */
F1000.GetSiblingsAndSelf = function(el) {
  if (!el || !el.parentNode) {
    return [];
  }

  return el.parentNode.children;
};


/**
 * Fetch a named URL parameter
 * @param  {String} name  The parameter name
 * @return {String}       The parameter value
 */
F1000.GetUrlParameter = function(name) {
  var results, regex;

  if (name === undefined) {
    return null;
  }

  if ('URLSearchParams' in window) {
    results = new URLSearchParams(window.location.search);
    return results.get(name);
  } else {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    results = regex.exec(window.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
};


/**
 * Hide an element
 * @param {HTMLElement} el  The element to hide
 */
F1000.HideElement = function(el) {
  if (!el) {
    return;
  }

  el.classList.add(F1000.Globals.Classes.HIDDEN);
  el.hidden = true;
};

/**
 * Hide multiple elements
 * @param {HTMLElement} els  The elements to hide
 */
F1000.HideElements = function (els) {
  if (!els) {
    return;
  }

  [].forEach.call(els, function(el) {
    F1000.HideElement(el);
  });
};


/**
 * Populate an element with content
 * @param {HTMLElement}        el       The element to populate
 * @param {String|HTMLElement} content  The content to populate it with
 */
F1000.PopulateElement = function(el, content) {
  if (!el) {
    return;
  }

  if (content instanceof HTMLElement) {
    el.appendChild(content);
  } else {
    const textNode = document.createTextNode(content);
    el.appendChild(textNode);
  }
};


/**
 * Remove an element
 * @param {HTMLElement} el  The element to remove
 */
F1000.RemoveElement = function(el) {
  if (!el) {
    return;
  }

  if (typeof el.remove === 'function') {
    el.remove();
  } else {
    if (el.parentNode !== null) {
      el.parentNode.removeChild(el);
    }
  }
};

/**
 * Remove multiple elements
 * @param {HTMLElement} els  The elements to remove
 */
F1000.RemoveElements = function(els) {
  if (!els) {
    return;
  }

  [].forEach.call(els, function(el) {
    F1000.RemoveElement(el);
  });
};


/**
 * Show an element
 * @param {HTMLElement} el  The element to show
 */
F1000.ShowElement = function(el) {
  if (!el) {
    return;
  }

  el.classList.remove(F1000.Globals.Classes.HIDDEN);
  el.hidden = false;
};

/**
 * Show multiple elements
 * @param {HTMLElement} els  The elements to show
 */
F1000.ShowElements = function (els) {
  if (!els) {
    return;
  }

  [].forEach.call(els, function(el) {
    F1000.ShowElement(el);
  });
};


F1000.ToggleClass = function(el, className, condition) {
  if (!el) {
    return;
  }

  el.classList.toggle(className, condition);
}

/**
 * Toggle the visibilty of an element
 * @param {HTMLElement} el    The element to toggle
 * @param {Boolean}     show  Show it be shown or hidden
 */
F1000.ToggleElement = function(el, show) {
  if (!el) {
    return;
  }

  show = show || false;

  if (show) {
    F1000.ShowElement(el);
  } else {
    F1000.HideElement(el);
  }
};


/**
 * Remove an entry from the data array
 * @param {Array}  store  Array of JSON objects
 * @param {String} id  ID of the deleted object
 */
F1000.RemoveEntryFromStoredData = function(store, id) {
  const index = store.findIndex(x => x.id === id);
  if (index > -1) {
    store.splice(index, 1);
  }
}

/**
 * Update the data array
 * @param {Array}  store  Array of JSON objects
 * @param {Object} data   JSON object from an API
 */
F1000.UpdateStoredData = function(store, data) {
  const index = store.findIndex(x => x.id === data.id);
  if (index === -1) {
    store.push(data);
  } else {
    store.splice(index, 1, data);
  }
};


/**
 * Validates a form field if no full stop at first character
 * @param   {String}  textString  The string to be validated
 * @return  {Boolean}             Full stop is first character
 */
F1000.ValidateNoFullStopFirstCharacter = function(textString) {
  var valid = (textString.charAt(0) === '.') ? false : true;
  return valid;
};


/**
 * Validates a form email-field if it is correctly formatted
 * @param  {String}  emailTextString  The email string to be validated
 * @return {Boolean}                  Is a correctly formatted email address
 */
F1000.ValidateEmail = function(emailTextString) {
  if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm.test(emailTextString))) {
    return false;
  }

  return true;
};
