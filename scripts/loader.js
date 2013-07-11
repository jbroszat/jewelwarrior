// loader.js

var jewel = {
	screens:{},
	settings: {
		'rows':8,
		'cols':8,
		'baseScore':100,
		'numJewelTypes':7
	}
};

window.addEventListener('load',function(){

	yepnope.addPrefix("preload",function(resource){
		resource.noexec = true;
		return resource;
	});

	Modernizr.load([{
		'load': [
			'scripts/sizzle.js',
			'scripts/dom.js',
			'scripts/game.js',
			'scripts/screen.splash.js',
			'scripts/screen.main-menu.js',],
		'complete': function() {
			console.log('Modernizr: Done loading scripts.');
			jewel.game.showScreen('splash-screen');
		}
	},{
		'test': Modernizr.webworkers,
		'yep': [
			"scripts/board.worker-interface.js",
			"preload!scripts/board.worker.js"
		],
		'nope': "scripts/board.js"
	}]);
});