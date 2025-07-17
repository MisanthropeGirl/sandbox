$(function(){
	var Tabs = {
		init: function(config){
			this.config = config;

			this.bindEvents();
			this.focusInitialTab();
		},

		bindEvents: function(){
			this.config.tabs.on('click', this.captureClick);
			this.config.tabs.on('keydown', this.captureKeydown);
		},

		captureClick: function(e){
			e.preventDefault();
			Tabs.switchTab($(this).attr('id'));
		},

		captureKeydown: function(e){
			var $this = $(this),
				targetTabId = '';

			switch (e.which){
				case Keys.ENTER:
				case Keys.SPACE:
					targetTabId = $this.attr('id');
					break;
				case Keys.ARROWLEFT:
				case Keys.ARROWUP:
					targetTabId = $this.parent().prev().children('[role=tab]').attr('id');
					if (targetTabId === undefined){
						targetTabId = $this.closest('[role=tablist]').children(':last-child').children('[role=tab]').attr('id');
					}
					break;
				case Keys.ARROWDOWN:
				case Keys.ARROWRIGHT:
					targetTabId = $this.parent().next().children('[role=tab]').attr('id');
					if (targetTabId === undefined){
						targetTabId = $this.closest('[role=tablist]').children(':first-child').children('[role=tab]').attr('id');
					}
					break;
			}
			if (targetTabId != '' && targetTabId !== undefined){
				e.preventDefault();
				Tabs.switchTab(targetTabId);
			}
		},

		focusInitialTab: function(){
			var initialTab = document.location.hash,
				targetTabId = '';

			if (initialTab != '' && initialTab !== undefined){
				targetTabId = $('[aria-controls=' + initialTab.replace('#', '') + ']').attr('id');
				if (targetTabId != '' && targetTabId !== undefined){
					Tabs.switchTab(targetTabId);
				}
			}
		},

		switchTab: function(selectedTabId){
			if (selectedTabId !== undefined){
				var tabList = $('#' + selectedTabId).closest('[role=tablist]');

				tabList.find('[role=tab]').each(function(){
					var $this = $(this),
						thisTabId = $this.attr('id');
					if (selectedTabId == thisTabId){
						$this.attr('aria-selected', 'true').attr('tabindex', 0).focus();
						$('#' + $this.attr('aria-controls')).attr('aria-hidden', 'false');
					}else{
						$this.attr('aria-selected', 'false').attr('tabindex', -1);
						$('#' + $this.attr('aria-controls')).attr('aria-hidden', 'true');
					}
				});
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
	}

	Tabs.init({
		tabs: $('[role=tab]')
	});
});
