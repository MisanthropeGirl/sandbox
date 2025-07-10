F1000.Sidebar = function() {
  this.sidebar = document.getElementsByClassName('js-sidebar')[0];
  this.sidebarPin = this.sidebar.getElementsByClassName('js-sidebar-pin')[0];
  this.sidebarToggle = this.sidebar.getElementsByClassName('js-sidebar-toggle')[0];

  this.clPin = 'is-pinned';
  this.clToggle = 'is-open';

  this.init();
};

F1000.Sidebar.prototype = {
  init: function() {
    var thisObj = this;

    this.sidebarPin.addEventListener('click', function(e) { thisObj.handleSidebarPin(e) }, false);
    this.sidebarToggle.addEventListener('click', function(e) { thisObj.handleSidebarToggle(e) }, false);
  },

  handleSidebarPin: function(e) {
    e.preventDefault();

    if (this.sidebar.classList.contains(this.clPin)) {
      this.sidebar.classList.remove(this.clPin);
      
      this.sidebarPin.innerHTML = '&#128204;';
      this.sidebarPin.title = 'Pin Sidebar';
    } else {
      this.sidebar.classList.add(this.clPin);

      this.sidebarPin.innerHTML = '<i class="material-icons">&#xE5CD;</i>';
      this.sidebarPin.title = 'Unpin Sidebar';
    }
  },

  handleSidebarToggle: function(e) {
    e.preventDefault();

    if (!this.sidebar.classList.contains(this.clPin)) {

      this.sidebar.classList.toggle(this.clToggle);

      if (this.sidebar.classList.contains(this.clToggle)) {
        this.sidebarToggle.firstElementChild.innerHTML = '&#xE5CC;';
        this.sidebarToggle.title = 'Close Sidebar';
      } else {
        this.sidebarToggle.firstElementChild.innerHTML = '&#xE5CB;';
        this.sidebarToggle.title = 'Open Sidebar';
      }
    }
  }
};

new F1000.Sidebar();


F1000.Status = function() {
  this.statusBtn = 'js-status';

  this.init();
};

F1000.Status.prototype = {
  init: function() {
    var thisObj = this,
      btns = document.getElementsByClassName(this.statusBtn);

    if (btns) {
      Array.prototype.forEach.call(btns, function(btn) {
        btn.addEventListener('click', function(e) { thisObj.handleClickEvent(e) }, false);
      });
    }
  },

  handleClickEvent: function(e) {
    var el = e.target,
      parentEl = el.parentNode,
      statusId = parentEl.getAttribute('data-status-id');

    if (parentEl.classList.contains('js-status-tristate')) {
      e.preventDefault();

      el.indeterminate = true;
      parentEl.classList.add(F1000.Globals.Classes.INDETERMINATE);
    } else if (parentEl.getAttribute('data-additional-action') === "true") {
      F1000.ShowElement(parentEl.nextElementSibling);
    } else {
      parentEl.classList.toggle(F1000.Globals.Classes.CHECKED);
    }

    // if (el.checked || el.indeterminate) {
    //   console.log(F1000.Globals.StatusCodes.get(statusId));
    // }
  }
};

new F1000.Status();
