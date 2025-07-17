$(function(){
	var Tabs = {
		init: function(config){
			this.config = config;

			this.bindEvents();
			this.focusInitialTab();
		},

		bindEvents: function(){
			this.config.tabList.children('[role=tab]').on('click', this.captureClick);
			this.config.tabList.children('[role=tab]').on('keydown', this.captureKeydown);
		},

		captureClick: function(e){
			e.preventDefault();
			Tabs.switchTab($(this).attr('aria-controls'));
		},

		captureKeydown: function(e){
			var self = Tabs,
				$tabList = self.config.tabList,
				targetTab = targetPanelId = '';

			switch (e.which){
				case Keys.ENTER:
					targetPanelId = $tabList.children('#' + $(this).attr('id')).attr('aria-controls');
					break;
				case Keys.LEFTARROW:
					targetTab = $tabList.children('#' + $(this).attr('id')).prev();
					targetPanelId = targetTab.attr('aria-controls');
					if (targetPanelId === undefined){
						targetPanelId = $tabList.children(':last-child').attr('aria-controls');
					}
					break;
				case Keys.RIGHTARROW:
					targetTab = $tabList.children('#' + $(this).attr('id')).next();
					targetPanelId = targetTab.attr('aria-controls');
					if (targetPanelId === undefined){
						targetPanelId = $tabList.children(':first-child').attr('aria-controls');
					}
					break;
			}
			if (targetPanelId != '' && targetPanelId !== undefined){
				e.preventDefault();
				self.switchTab(targetPanelId);
			}
		},

		focusInitialTab: function(){
			var self = Tabs,
				initialTab = document.location.hash;

			if (initialTab != '' && initialTab !== undefined){
				var targetPanelId = self.config.tabList.children(initialTab).attr('aria-controls');
				if (targetPanelId !== undefined){
					self.switchTab(targetPanelId);
				}
			}
		},

		switchTab: function(selectedPanelId){
			if (selectedPanelId !== undefined){
				var self = Tabs;

				self.config.tabList.children('[role=tab]').each(function(){
					var $this = $(this),
						thisPanelId = $this.attr('aria-controls');
					if (selectedPanelId == thisPanelId){
						$this.attr('aria-selected', 'true').attr('tabindex', 0).focus();
						$('#' + thisPanelId).attr('aria-hidden', 'false');
					}else{
						$this.attr('aria-selected', 'false').attr('tabindex', -1);
						$('#' + thisPanelId).attr('aria-hidden', 'true');
					}
				});
			}
		}
	};

	Tabs.init({
		tabList: $('[role=tablist]')
	});
});