$(function(){
	var GraphResizing = {
		init: function(){
			graphContainer = $('.ms-section-growth-chart');
			//CommonFunctions = new CommonFunctions();

			this.resizeChart();
		},

		resizeChart: function(){
			graphContainer.each(function(){
				var $thisGraph = $(this),
					$thisGraphImg = $thisGraph.find('img'),
					containerWidth = $thisGraph.width(),
					currentChartSrc = $thisGraphImg.attr('src'),
					chartParams = CommonFunctions.getQueryParams(currentChartSrc),
					newChartSrc = '';

				if (containerWidth == 0){
					var $hiddenCopy = $thisGraph.clone().appendTo('body');
					containerWidth = $hiddenCopy.width();
					$hiddenCopy.remove();
				}
				var x = chartParams['chs'].substr(0, chartParams['chs'].indexOf('x')),
					y = chartParams['chs'].substr(chartParams['chs'].indexOf('x') + 1),
					ratio = y / x;
				chartParams['chs'] = containerWidth + 'x' + Math.floor(containerWidth * ratio);

				if ("chmg" in chartParams){
					var margins = chartParams['chmg'].split(','),
						xIncrease = containerWidth / x,
						yIncrease = Math.floor(containerWidth * ratio) / y,
						newMargins = '';
						
					$.each(margins, function(i,v){
						if (i % 2 == 0){
							newMargins += Math.floor(v * yIncrease) + ','
						}else{
							newMargins += Math.floor(v * xIncrease) + ','
						}
					});
					chartParams['chmg'] = newMargins.substr(0, newMargins.lastIndexOf(','));
				}

				for (var x in chartParams){
					newChartSrc += x + '=' + chartParams[x] + '&';
				}
				newChartSrc = newChartSrc.substr(0, newChartSrc.lastIndexOf('&'));
				$thisGraphImg.attr('src', currentChartSrc.substring(0, currentChartSrc.indexOf('?')) + '?' + newChartSrc);
			});
		}
	};

	GraphResizing.init();
	$(window).on('orientationchange', function(){
		GraphResizing.init();
	});
	$(window).on('resize', function(){
		GraphResizing.init();
	});
});