F1000.ExpandableTable = function() {
  this.init();
};

F1000.ExpandableTable.prototype = {
  init() {
    let containers = this.getTableContainers(),
      tables;

    this.observer = new MutationObserver(mutations => this.handleDomChanges(mutations));

    for (let container of containers) {
      // add listeners
      container.addEventListener('click', e => this.handleClickEvent(e), false);

      // need a DOM listener in here to open any table which is changed

      // initial table setup
      tables = container.querySelectorAll('table');

      for (let table of tables) {
        this.observer.observe(table, { attributes: true });
        this.toggleTable(table);
      }
    }
  },


  getTableContainers() {
    return document.querySelectorAll('.js-expandable-table-container');
  },


  handleClickEvent(e) {
    let el = e.target,
      caption = el.closest('caption'),
      link = el.closest('a');

    if (!caption || link) {
      return;
    }

    this.toggleTable(caption.closest('table'));
  },

  handleDomChanges(mutations) {
    let thisObj = this;

    mutations.forEach(mutation => {
      switch (mutation.attributeName) {
        case 'data-updated':
          if (mutation.target.dataset.updated === 'true') {
            if (mutation.target.classList.contains('is-closed')) {
              this.toggleTable(mutation.target);
            }
          }
          break;
      }
    });
  },


  toggleTable(table) {
    let caption = table.caption,
      icon = caption.querySelector('.js-expandable-table-icon');

    if (!caption) {
      return;
    }

    table.classList.toggle('is-closed');

    if (table.classList.contains('is-closed')) {
      caption.title = 'Expand conversation';
      icon.innerText = 'keyboard_arrow_down';
    } else {
      caption.title = 'Collapse conversation';
      icon.innerText = 'keyboard_arrow_up';
    }
  }
};

new F1000.ExpandableTable();
