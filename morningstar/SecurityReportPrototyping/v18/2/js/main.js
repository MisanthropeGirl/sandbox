yepnope([{
	load: ['preload!js/lib/jquery-2.1.1.min.js', 'preload!js/app/commonFunctions.js'],
	complete: function() {
		console.log(aScripts);
		var aScriptsUnique = [];
		for (var script in aScripts){
			var thisPath = aScripts[script];
			if (aScriptsUnique.indexOf(thisPath) === -1){
				aScriptsUnique.push(thisPath);
			}
		}
		console.log(aScriptsUnique);

		for (key in aScriptsUnique){
			var test, file = 'js/app/jquery.' + aScriptsUnique[key] + '.js';
			switch (aScriptsUnique[key]){
				case "graphResizing":
					test = '.ms-section-growth-chart';
					break;
				case "tabSwitching":
					test = '[role="tablist"]';
					break;
			}
			yepnope([{
				test: $(test),
				yep: file
			}]);
		}
	}
}]);
