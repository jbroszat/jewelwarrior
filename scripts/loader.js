// loader.js

var jewel = {};

window.addEventListener('load',function(){
	Modernizr.load([{
		load: [
			'scripts/sizzle.js',
			'scripts/dom.js',
			'scripts/game.js' ],
		complete: function() {
			console.log('Modernizr: Alle Scripte geladen.');
			jewel.game.showScreen('splash-screen');
		}
	}]);
});