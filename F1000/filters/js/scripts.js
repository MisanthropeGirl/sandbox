F1000.ArticleSearch = function() {
  this.select = 'js-article-search-select';
  this.searchRow = 'js-article-search-row';
  this.searchRows = 'js-article-search-rows';
  this.searchRowAdd = 'js-article-search-row-add';
  this.searchRowInput = 'js-article-search-row-input';
  this.searchRowRemove = 'js-article-search-row-remove';
  this.searchRowOperator = 'js-article-search-row-operator';
  this.searchThesaurusRow = 'js-article-search-thesaurus-container';
  this.searchThesaurusRowSelector = 'js-article-search-thesaurus';
  this.searchThesaurusRowRemove = 'js-article-search-thesaurus-remove';

  this.childResults = [{"id":190,"termName":"Agriculture","numberOfChildren":19,"numberOfParents":1,"new":false},{"id":342,"termName":"Anatomy","numberOfChildren":27,"numberOfParents":2,"new":false},{"id":650,"termName":"Astrobiology","numberOfChildren":1,"numberOfParents":2,"new":false},{"id":874,"termName":"Behavior","numberOfChildren":18,"numberOfParents":1,"new":false},{"id":936,"termName":"Bioacoustics","numberOfChildren":0,"numberOfParents":2,"new":false},{"id":945,"termName":"Biochemistry","numberOfChildren":32,"numberOfParents":1,"new":false},{"id":958,"termName":"Bioethics","numberOfChildren":5,"numberOfParents":2,"new":false},{"id":967,"termName":"Biogeography","numberOfChildren":2,"numberOfParents":3,"new":false},{"id":993,"termName":"Biomechanics","numberOfChildren":6,"numberOfParents":1,"new":false},{"id":1006,"termName":"Biophysics","numberOfChildren":9,"numberOfParents":2,"new":false},{"id":1017,"termName":"Biotechnology","numberOfChildren":12,"numberOfParents":1,"new":false},{"id":1470,"termName":"Cell biology","numberOfChildren":23,"numberOfParents":1,"new":false},{"id":1767,"termName":"Chronobiology","numberOfChildren":3,"numberOfParents":1,"new":false},{"id":1985,"termName":"Computational biology","numberOfChildren":15,"numberOfParents":1,"new":false},{"id":2056,"termName":"Conservation biology","numberOfChildren":3,"numberOfParents":2,"new":false},{"id":2196,"termName":"Cryobiology","numberOfChildren":2,"numberOfParents":1,"new":false},{"id":2483,"termName":"Developmental biology","numberOfChildren":21,"numberOfParents":1,"new":false},{"id":2773,"termName":"Ecology","numberOfChildren":34,"numberOfParents":2,"new":false},{"id":3181,"termName":"Evolutionary biology","numberOfChildren":12,"numberOfParents":1,"new":false},{"id":3741,"termName":"Genetics","numberOfChildren":36,"numberOfParents":1,"new":false},{"id":4578,"termName":"Immunology","numberOfChildren":20,"numberOfParents":2,"new":false},{"id":5522,"termName":"Marine biology","numberOfChildren":12,"numberOfParents":2,"new":false},{"id":5815,"termName":"Microbiology","numberOfChildren":18,"numberOfParents":1,"new":false},{"id":5946,"termName":"Molecular biology","numberOfChildren":7,"numberOfParents":1,"new":false},{"id":6152,"termName":"Mycology","numberOfChildren":9,"numberOfParents":1,"new":false},{"id":6394,"termName":"Neuroscience","numberOfChildren":27,"numberOfParents":1,"new":false},{"id":6604,"termName":"Nutrition","numberOfChildren":6,"numberOfParents":2,"new":false},{"id":6803,"termName":"Organisms","numberOfChildren":9,"numberOfParents":1,"new":false},{"id":6943,"termName":"Paleontology","numberOfChildren":17,"numberOfParents":2,"new":false},{"id":7025,"termName":"Parasitology","numberOfChildren":9,"numberOfParents":1,"new":false},{"id":7355,"termName":"Physical anthropology","numberOfChildren":1,"numberOfParents":2,"new":false},{"id":7378,"termName":"Physiology","numberOfChildren":19,"numberOfParents":2,"new":false},{"id":7485,"termName":"Plant science","numberOfChildren":22,"numberOfParents":1,"new":false},{"id":7644,"termName":"Population biology","numberOfChildren":5,"numberOfParents":1,"new":false},{"id":7969,"termName":"Psychology","numberOfChildren":22,"numberOfParents":2,"new":false},{"id":8156,"termName":"Radiobiology","numberOfChildren":1,"numberOfParents":1,"new":false},{"id":9149,"termName":"Species interactions","numberOfChildren":5,"numberOfParents":1,"new":false},{"id":9231,"termName":"Sports science","numberOfChildren":2,"numberOfParents":1,"new":false},{"id":9552,"termName":"Synthetic biology","numberOfChildren":8,"numberOfParents":2,"new":false},{"id":9585,"termName":"Systems biology","numberOfChildren":2,"numberOfParents":2,"new":false},{"id":9635,"termName":"Taxonomy","numberOfChildren":6,"numberOfParents":2,"new":false},{"id":9723,"termName":"Theoretical biology","numberOfChildren":0,"numberOfParents":1,"new":false},{"id":9907,"termName":"Toxicology","numberOfChildren":16,"numberOfParents":2,"new":false},{"id":10348,"termName":"Veterinary science","numberOfChildren":9,"numberOfParents":1,"new":false},{"id":10662,"termName":"Zoology","numberOfChildren":17,"numberOfParents":1,"new":false}];

  this.initSelectr();
  // this.initThesaurus();
  this.initSearchRow();
};

F1000.ArticleSearch.prototype = {
  initSearchRow: function(rows) {
    var thisObj = this,
      btnAdd, btnRemove, input;

    if (!rows) {
      rows = document.querySelectorAll('.' + this.searchRow);
    }

    [].forEach.call(rows, function(row) {
      textSearch = row.querySelector('.' + thisObj.searchRowInput);
      if (textSearch) {
        textSearch.addEventListener('input', function(e) { thisObj.handleRowInput(e) }, false);
      }

      btnAdd = row.querySelector('.' + thisObj.searchRowAdd);
      if (btnAdd) {
        btnAdd.addEventListener('click', function(e) { thisObj.handleRowAdd(e) }, false);
      }

      btnRemove = row.querySelector('.' + thisObj.searchRowRemove);
      if (btnRemove) {
        btnRemove.addEventListener('click', function(e) { thisObj.handleRowRemove(e) }, false);
      }
    });
  },

  initSelectr: function(selectEls) {
    var thisObj = this,
      selector, placeholder, allowDeselect, clearable, defaultSelected;

    if (!selectEls) {
      selectEls = document.querySelectorAll('.' + this.select);
    }

    [].forEach.call(selectEls, function (select) {
      placeholder = select.getAttribute('data-placeholder') || null;
      allowDeselect = !select.multiple;
      clearable = placeholder !== null;
      defaultSelected = placeholder === null;

      selector = new Selectr(select, {
        allowDeselect: allowDeselect,
        clearable: clearable,
        closeOnScroll: true,
        defaultSelected: defaultSelected,
        placeholder: placeholder !== null ? placeholder : null,
        searchable: false
      });

      if (select.classList.contains(thisObj.searchThesaurusRowSelector)) {
        selector.on('selectr.clear', function() {
          thisObj.handleThesaurusDelete(this);
        });
        selector.on('selectr.select', function(option) {
          thisObj.handleThesaurusSelect(option);
        });
      }
    });
  },

  // initThesaurus: function(rows) {
  //   var thisObj = this,
  //     button, selector;

  //   if (!rows) {
  //     rows = document.querySelectorAll('.' + this.searchThesaurusRow);
  //   }

  //   [].forEach.call(rows, function(row) {
  //     selector = row.querySelector('.' + thisObj.searchThesaurusRowSelector);
  //     if (selector) {
  //       selector.addEventListener('change', function(e) { thisObj.handleThesaurusSelect(e) }, false);
  //     }

  //     button = row.querySelector('.' + thisObj.searchThesaurusRowRemove);
  //     if (button) {
  //       button.addEventListener('click', function(e) { thisObj.handleThesaurusDelete(e) }, false);
  //     }
  //   });
  // },


  handleRowAdd: function(e) {
    var btnAdd = e.currentTarget,
      row = F1000.FindAncestor(btnAdd, '.' + this.searchRow),
      btnRemove = row.querySelector('.' + this.searchRowRemove),
      textSearch = row.querySelector('.' + this.searchRowInput),
      operator = row.nextElementSibling,
      rows = F1000.FindAncestor(row, '.' + this.searchRows);

    if (textSearch.value.length > 0) {
      rows.appendChild(F1000.CloneTemplate('searchRow'));

      this.indexSearchRows();

      this.initSelectr(rows.lastElementChild.querySelectorAll('.' + this.select));
      this.initSearchRow(rows.lastElementChild.querySelectorAll('.' + this.searchRow));

      operator.classList.remove(F1000.Globals.Classes.HIDDEN);
      btnAdd.setAttribute('disabled', 'disabled');
      btnRemove.removeAttribute('disabled');
    }
  },

  handleRowInput: function(e) {
    var textSearch = e.currentTarget,
      container = F1000.FindAncestor(textSearch, '.' + this.searchRow);

    if (textSearch.value.length > 0) {
      container.querySelector('.' + this.searchRowAdd).removeAttribute('disabled');
    } else {
      container.querySelector('.' + this.searchRowAdd).setAttribute('disabled', 'disabled');
    }
  },

  handleRowRemove: function(e) {
    var btn = e.currentTarget,
      container = F1000.FindAncestor(btn, '.' + this.searchRow);

    if (container) {
      container.parentNode.remove();
      this.indexSearchRows();
    }
  },

  handleThesaurusDelete: function(obj) {
    // var button = e.currentTarget,
    //   selector = button.parentNode.querySelector('.' + this.searchThesaurusRowSelector),
    //   dataLevel = parseInt(selector.getAttribute('data-level'));

    if (obj.el.classList.contains(this.searchThesaurusRowSelector)) {
      this.removeSearchLevels(F1000.FindAncestor(obj.el, '.' + this.searchThesaurusRow));
    }
  },

  handleThesaurusSelect: function(option) {
    if (option.parentNode.classList.contains(this.searchThesaurusRowSelector)) {
      this.createNewSearchLevel(option.parentNode);
    }
  },


  createNewSearchLevel: function(thesaurusEl) {
    var thesaurusTerm = thesaurusEl.value,
      hasChildren = thesaurusEl[thesaurusEl.selectedIndex].getAttribute('data-children'),
      parent = F1000.FindAncestor(thesaurusEl, '.' + this.searchThesaurusRow),
      container = parent.parentNode,
      newThesaurusEl, newThesaurusElParent;

    this.removeSearchLevels(parent);

    if (hasChildren === 'true') {
      // newSearchEl = this.createNewSearchLevel(dataLevel, term);
      container.appendChild(F1000.CloneTemplate('thesaurusLevel'));

      newThesaurusElParent = container.lastElementChild;

      newThesaurusEl = newThesaurusElParent.querySelector('.' + this.searchThesaurusRowSelector);
      newThesaurusEl.setAttribute('data-parent-id', thesaurusTerm);
      this.loadThesaurusResults(newThesaurusEl, thesaurusTerm);

      newThesaurusEl = newThesaurusElParent.querySelectorAll('.' + this.searchThesaurusRowSelector);
      this.initSelectr(newThesaurusEl);

      // this.initThesaurus(newThesaurusElParent);
    }
  },

  indexSearchRows: function() {
    var thisObj = this,
      rows = document.querySelector('.' + this.searchRows),
      input, field, operator;

    [].forEach.call(rows.children, function(row, i){
      input = row.querySelector('.' + thisObj.searchRowInput);
      if (input) {
        input.name = 'fieldSearches[' + i + '].fieldValue';
      }

      field = row.querySelector('.' + thisObj.searchRow + ' .' + thisObj.select);
      if (field) {
        field.name = 'fieldSearches[' + i + '].fieldName';
      }

      operator = row.querySelector('.' + thisObj.searchRowOperator + ' .' + thisObj.select);
      if (operator) {
        operator.name = 'fieldSearches[' + i + '].logicalOperator';
      }
    });
  },


  loadThesaurusResults(el, term) {
    var thisObj = this;

    // $.ajax({
    //   url: '/thesaurus/term/select/children/' + term
    // })
    // .done(function(data) {
    //   thisObj.populateThesaurusResults(el, data);
    // })
    // .fail(function() {
    //   console.log('Error fetching children of ' + term);
    // })

    this.populateThesaurusResults(el, this.childResults);
  },

  populateThesaurusResults: function(el, data) {

    if (data.length > 0) {
      data.forEach(function(term, i) {
        el.appendChild(F1000.CloneTemplate('thesaurusResults'));

        el.lastElementChild.value = term.id;
        el.lastElementChild.innerText = term.termName + ' (' + term.numberOfChildren + ')';
        el.lastElementChild.setAttribute('data-children', term.numberOfChildren > 0);
      });
    }
  },

  removeSearchLevels: function(el) {
    while (el.nextElementSibling) {
      // el.parentNode.removeChild(el.nextElementSibling);
      el.nextElementSibling.remove();
    }
  },

};

new F1000.ArticleSearch();


F1000.CloneTemplate = function(id) {
  var template = document.getElementById(id);

  if (template) {
    return document.importNode(template.content, true);
  }
};


F1000.FindAncestor = function(el, sel) {
  if (el && sel.length > 0) {
    if (typeof el.closest === 'function') {
      return el.closest(sel) || null;
    }

    while (el) {
      if (el.matches(sel)) {
        return el;
      }
      el = el.parentElement;
    }
  }

  return null;
};


F1000.InsertAfter = function(el, newEl) {
  if (el && newEl) {
    if (typeof el.after === 'function') {
      return el.after(newEl);
    } else {
      return el.insertAdjacentHTML('afterend', newEl);
    }
  }

  return false;
};
