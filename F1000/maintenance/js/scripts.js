F1000.ExternalMaintenanceAlerts = function() {
  // external necessities
  this.Console = new F1000.Console();
  this.CookieHelper = new F1000.CookieHelper();
  this.MdlHelper = new F1000.MdlHelper();

  this.inEditorSite = location.pathname.indexOf('/editor') !== -1;
  this.loadTime = moment();
  
  this.currentAlerts = [];

  this.init();
};

F1000.ExternalMaintenanceAlerts.prototype = {
  /**********
   * Getters and Setters
   **********/


  init: function() {
    this.fetchCurrentAlerts();
    this.loadAlerts();
  },

  /**
   * Console start-up
   * Add necessary event handlers
   */
  initConsole: function() {
    this.Console.console.addEventListener('click', e => { this.handleClickEvent(e) }, false);
  },


  /**********
   * Event Handlers
   **********/

  /**
   * Handle a click event
   * @param {Object} e  The event
   */
  handleClickEvent: function(e) {
    const el = e.target,
      btn = el.closest('button'); // find closest button ancestor element

    // if it isn't a button then ignore
    if (!btn || btn.disabled) {
      return;
    }

    switch (btn.dataset.action) {
      case 'maintenance-close':
        this.consoleClose(btn.dataset.cookies);
        break;
    }
  },


  fetchCurrentAlerts: function() {
    // no point in going any further if there aren't any
    if (F1000.ExtenalMaintenanceItems.length === 0) {
      return;
    }

    F1000.ExtenalMaintenanceItems.forEach(this.checkExtenalMaintenanceItem, this);
  },

  checkExtenalMaintenanceItem: function(item) {
    var afterStartTime = this.loadTime.isSame(item.start) || this.loadTime.isAfter(item.start),
      beforeEndTime = this.loadTime.isBefore(item.end),
      editor = item.editor ? true : !this.inEditorSite,
      cookie = !this.CookieHelper.checkCookie(item.cookieName); // remember to prepend platform to this

    if (afterStartTime && beforeEndTime && editor && cookie) {
      this.currentAlerts.push(item);
    }
  },

  loadAlerts: function() {
    // no point in going any further if there aren't any
    if (this.currentAlerts.length === 0) {
      return false;
    }

    var msgs = document.createElement('div');
    msgs.classList.add('c-external-maintenance');

    this.currentAlerts.forEach(function(currentAlert) {
      var msg = document.createElement('div');

      msg.classList.add('c-external-maintenance__item');
      msg.innerHTML = currentAlert.msg;

      msgs.appendChild(msg);
    });

    // create the console
    this.consoleCreate();

    // if that failed then stop
    if (!this.Console.consoleBody) {
      console.log('no console');
      return;
    }

    this.Console.consoleBody.appendChild(msgs);

    // initialise the console
    this.initConsole();

    // and show it
    this.Console.show();
  },


  /**********
   * Methods: Console
   **********/

  /**
   * Create the console
   * Fall through to the Console create method, passing in the necessary modal and console options
   */
  consoleCreate: function() {
    var cookieNames = [];
    this.currentAlerts.forEach(function(currentAlert) {
        cookieNames.push(currentAlert.cookieName);
    });

    this.Console.create(
      {
        showCloseBtn: false,
        size: 'auto'
      },
      {
        header: {
          show: false,
          title: {
            text: 'Maintenance'
          }
        },
        footer: {
          buttons: {
            close: {
              action: 'maintenance-close'
            },
            dataset: [
              {
                name: 'cookies',
                value: cookieNames.join(',')
              }
            ]
          }
        }
      }
    );
  },

  /**
   * Close the console
   * Add an update flag and then fall through to the Console close method
   */
  consoleClose: function(cookies) {

    // set cookies
    cookies = cookies.split(',');
    cookies.forEach(function(cookie) {
      this.CookieHelper.saveCookie(cookie, 1);
    }, this);

    this.Console.close();
  }
};

new F1000.ExternalMaintenanceAlerts();
