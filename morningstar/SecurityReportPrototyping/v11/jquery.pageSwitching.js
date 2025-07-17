$(function(){
	var PageSwitching = {
		init: function(config){
			this.config = config;

			this.bindEvents();
		},

		bindEvents: function(){
			this.config.pageListLinks.on('click', this.switchTab);
		},

		switchTab: function(e){
			e.preventDefault();

			var thisPageId = $(this).parent().attr('data-tab'),
				$pageContentContainer = PageSwitching.config.pageContentContainer;

			PageSwitching.config.pageListItems.each(function(){
				var $this = $(this),
					thisId = $this.attr('data-tab');

				if (thisId == thisPageId){
					$this.addClass('selected');
					$pageContentContainer.closest('[data-tab=' + thisId + ']').removeClass('hidden');
				}else{
					$this.removeClass('selected');
					$pageContentContainer.closest('[data-tab=' + thisId + ']').addClass('hidden');
				}
			});
		}
	};

	PageSwitching.init({
		pageContentContainer: $('#msReportBody > section'),
		pageListItems: $('nav ul.tabs li'),
		pageListLinks: $('nav ul.tabs li a')
	});
});