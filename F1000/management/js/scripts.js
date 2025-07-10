F1000.Filter = function() {
  this.filter = 'js-filter';
  this.results = 'js-results';

  this.bindFilters();
};

F1000.Filter.prototype = {
  bindFilters: function() {
    var thisObj = this,
      filters = document.getElementsByClassName(this.filter);

    Array.prototype.forEach.call(filters, function(filter) {
      filter.addEventListener('change', function(e) { thisObj.handleFilterChange(e); }, false);
    });
  },


  handleFilterChange: function(e) {
    var thisObj = this,
      filter = e.currentTarget,
      filterName = filter.name,
      filterValue = filter.value.trim(),
      results = document.querySelector('.' + this.results),
      hide, rowValue;

    Array.prototype.forEach.call(results.querySelectorAll('[data-' + filterName + ']'), function(row) {
      rowValue = row.getAttribute('data-' + filterName);

      switch (true) {
        case filterValue.length === 0:
        case filterValue === '':
        case filterValue === rowValue:
        case filterValue.indexOf('+') > -1 && rowValue >= filterValue.substr(0, filterValue.indexOf('+')):
        case filterValue.indexOf('-') > -1 && rowValue <= filterValue.substr(0, filterValue.indexOf('-')):
          hide = false;
          break;
        default:
          hide = true;
      }

      if (hide) {
        row.classList.add(thisObj.Globals.HIDDEN);
      } else {
        row.classList.remove(thisObj.Globals.HIDDEN);
      }
    });
  },
};

new F1000.Filter();


F1000.TogglePanel = function() {
  this.toggleBtn = 'js-toggle-btn';

  this.bindEvents();
};

F1000.TogglePanel.prototype = {
  bindEvents: function() {
    var thisObj = this,
      buttons = document.getElementsByClassName(this.toggleBtn);

    // document.body.addEventListener('click', function(e) { thisObj.closeAllPanels(e) }, false)

    Array.prototype.forEach.call(buttons, function(button) {
      button.addEventListener('click', function(e) { thisObj.togglePanel(e) }, false);
    });
  },


  // closeAllPanels: function(e) {
  //   var thisObj = this,
  //     buttons = document.getElementsByClassName(this.toggleBtn);

  //   Array.prototype.forEach.call(buttons, function(button) {
  //     button.classList.remove(thisObj.Globals.OPEN);
  //     button.querySelector('.material-icons').innerText = '\uE5C5';
  //     button.nextElementSibling.classList.add(thisObj.Globals.HIDDEN);
  //   });
  // },

  togglePanel: function(e) {
    e.preventDefault();
    e.stopPropagation();

    var btn = e.currentTarget,
      icon = btn.querySelector('.material-icons'),
      search = btn.nextElementSibling;

    if (btn.classList.contains(F1000.Globals.Classes.OPEN)) {
      btn.classList.remove(F1000.Globals.Classes.OPEN);
      icon.innerText = '\uE5C5';
      search.classList.add(F1000.Globals.Classes.HIDDEN);
    } else {
      btn.classList.add(F1000.Globals.Classes.OPEN);
      icon.innerText = '\uE5C7';
      search.classList.remove(F1000.Globals.Classes.HIDDEN);
    }
  },
};

new F1000.TogglePanel();


F1000.CustomiseTable = function() {
  this.columns = 'js-customise';
  this.results = 'js-results';

  this.init();
};

F1000.CustomiseTable.prototype = {
  init: function() {
    var thisObj = this,
      colsToHide = this.fetchCookie(),
      input;

    if (colsToHide.length > 0) {
      colsToHide = colsToHide.split(',');

      colsToHide.forEach(function(column) {
        thisObj.showHideColumns(column, false);

        input = document.querySelector('.' + thisObj.columns + '[name="customise-' + column + '"]')
        input.checked = false;
        input.parentNode.classList.remove('is-checked');
      });
    }

    this.bindEvents();
  },


  bindEvents: function() {
    var thisObj = this,
      columns = document.getElementsByClassName(this.columns);

    Array.prototype.forEach.call(columns, function(column) {
      column.addEventListener('change', function(e) { thisObj.handleColumnChange(e); }, false);
    });
  },


  handleColumnChange: function(e) {
    var thisObj = this,
      column = e.currentTarget,
      show = column.checked;

    this.updateHiddenCols();
    this.showHideColumns(column.name, column.checked);
  },


  fetchCookie: function() {
    var cookieName = 'AMColumns',
      re = new RegExp('(?:(?:^|.*;\\s*)' + cookieName + '\\s*\\=\\s*([^;]*).*$)|^.*$');

    return document.cookie.replace(re, '$1');
  },

  saveCookie: function(name, value) {
    document.cookie = name + '=' + value;
  },

  showHideColumns: function(name, show) {
    var results = document.querySelector('.' + this.results),
      hidden = F1000.Globals.Classes.HIDDEN;

    name = name.replace('customise-', '');

    Array.prototype.forEach.call(results.querySelectorAll('[data-name="' + name + '"]'), function(cell) {
      if (show) {
        cell.classList.remove(hidden);
      } else {
        cell.classList.add(hidden);
      }
    });
  },

  updateHiddenCols: function() {
    var columns = document.getElementsByClassName(this.columns),
      csv = '';

    Array.prototype.forEach.call(columns, function(column) {
      if (!column.checked) {
        csv += ',' + column.name.replace('customise-', '');
      }
    });
    csv = csv.substring(1);

    this.saveCookie('AMColumns', csv);
  }
};

new F1000.CustomiseTable();
