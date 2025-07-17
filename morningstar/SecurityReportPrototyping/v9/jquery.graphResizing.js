$(function(){
	var GraphResizing = {
		init: function(){
			graphContainer = $('#imgResize2c');
			graphImage = $('#imgResize2c img');

			this.resizeChart();
		},

		resizeChart: function(){
			var $graphContainer = graphContainer,
				$graphImage = graphImage;

			if ($graphContainer.length){
				var containerWidth = $graphContainer.width(),
					currentChartSrc = $graphImage.attr('src'),
					chartParams = getQueryParams(currentChartSrc),
					newChartSrc = '';

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
				$graphImage.attr('src', currentChartSrc.substring(0, currentChartSrc.indexOf('?')) + '?' + newChartSrc);
			}
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