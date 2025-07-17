console.log(aScripts);
//var aScriptsUnique = ['jquery', 'modernizr'];
var aScriptsUnique = ["modernizr"];
for (var script in aScripts){
	var thisPath = "app/" + aScripts[script];
	if (aScriptsUnique.indexOf(thisPath) === -1){
		aScriptsUnique.push(thisPath);
	}
}
console.log(aScriptsUnique);
scripts = aScriptsUnique.join();
console.log(scripts);

requirejs.config ({
	paths: {
		jquery: 'lib/jquery-2.1.1.min',
		modernizr: 'lib/modernizr'
	}
});
requirejs(aScriptsUnique);
//requirejs(['jquery-2.1.1.min', 'modernizr']);