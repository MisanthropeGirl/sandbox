var ieversion = document.documentMode /*@cc_on || 7 @*/;
if (ieversion > 9) document.documentElement.className += ' ie' + ieversion;
if (window.opera) document.documentElement.className += ' opera';

$(function(){
	var Menu = {
		init: function(config){
			this.config = config;

			this.menuStructure();
			this.bindEvents();
		},

		bindEvents: function(){
			this.config.menu.find('[role="menuitem"]').on('keydown', this.captureKeydown);
		},

		captureKeydown: function(e){
			var $this = $(this),
				currentMenuItem = $this.attr('id'),
				currentMenuItemIndex = menu.indexOf($this.attr('id')),
				targetMenuItemId = '';

			switch (e.which){
				case Keys.ARROWLEFT:
				case Keys.ARROWUP:
					targetMenuItemId = menu[(currentMenuItemIndex > 0) ? currentMenuItemIndex - 1 : menu.length - 1];
					break;
				case Keys.ARROWDOWN:
				case Keys.ARROWRIGHT:
					targetMenuItemId = menu[(currentMenuItemIndex < (menu.length - 1)) ? currentMenuItemIndex + 1 : 0];
					break;
			}

			if (targetMenuItemId != '' && targetMenuItemId !== undefined){
				e.preventDefault();
				Menu.switchItem(targetMenuItemId);
			}
		},

		menuStructure: function(){
			menu = new Array();
			$.each(this.config.menu.find('[role="menuitem"]'), function(){
				menu.push($(this).attr('id'));
			});
		},

		switchItem: function(targetMenuItemId){
			if (targetMenuItemId !== undefined){
				this.config.menu.find('#' + targetMenuItemId).focus();
			}
		}
	};

	var Keys = {
		ARROWDOWN: 40,
		ARROWLEFT: 37,
		ARROWRIGHT: 39,
		ARROWUP: 38,
		ENTER: 13,
		SPACE: 32
	};

	Menu.init({
		menu: $('[role="menubar"]')
	});
});
