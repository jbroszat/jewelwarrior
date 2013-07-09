// board.js

jewel.board = (function(){
	var settings,
		jewels,
		cols,
		rows,
		baseScore,
		numJewelTypes;
	
	function initialize(callback) {
		settings = jewel.settings;
		numJewelTypes = settings.numJewelTypes;
		baseScore = settings.baseScore;
		cols = settings.cols;
		rows = settings.rows;
		fillboard();
		callback();
	}

	function fillboard() {
		var x,y,type;
		jewels = [];
		for (x = 0; x < cols; ++x) {
			jewels[x] = [];
			for (y = 0; y < rows; ++y) {
				type = randomJewel();
				while ( ( type === getJewel(x-1,y) && type === getJewel(x-2,y) ) ||
						( type === getJewel(x,y-1) && type === getJewel(x,y-2) ) ) {
					type = randomJewel();
				}
				jewels[x][y] = type;
			}
		}
	}

	function getJewel(x,y) {
		if (x < 0 || x > cols-1 || y < 0 || y > rows-1) {
			return -1;
		} else {
			return jewels[x][y];
		}
	}

	function randomJewel() {
		return Math.floor(Math.random() * numJewelTypes)
	}

	function checkChain(x,y) {
		var type = getJewel(x,y), left = 0, right = 0, down = 0, up = 0;

		while (type === getJewel(x + right + 1, y)) {
			right++;
		}

		while (type === getJewel(x - left - 1, y)) {
			left++;
		}

		while (type === getJewel(x, y + up + 1)) {
			up++;
		}

		while (type === getJewel(x, y - down - 1)) {
			down++;
		}

		return Math.max(left + 1 + right, up + 1 + down);
	}

	function canSwap(x1,y1,x2,y2) {
		var type1 = getJewel(x1,y1), type2 = getJewel(x2,y2), chain;

		if (!isAdjacent(x1,y1,x2,y2)) {
			return false;
		}

		jewels[x1][y1] = type2;
		jewels[x2][y2] = type1;

		chain = (checkChain(x2,y2) > 2 || checkChain(x1,y1) > 2);

		jewels[x1][y1] = type1;
		jewels[x2][y2] = type2;

		return chain;
	}

	function isAdjacent (x1,y1,x2,y2) {
		var dx = Math.abs(x1 - x2), dy = Math.abs(y1 - y2);
		return (dx + dy === 1);
	}

	function getChains() {
		var x,y,chains = [];

		for (x = 0, x < cols; x++) {
			chains[x] = [];
			for (y = 0, y < rows; y++) {
				chains[x][y] = checkChain(x,y);
			}
		}

		return chains;
	}

	function print() {
		var str = "";
		for (var y = 0; y < rows; y++) {
			for (var x = 0; x < cols; x++) {
				str += getJewel(x,y) + " ";
			}
			str += "\n";
		}
		console.log(str);
	}		

	return {
		initialize:initialize,
//		canSwap:canSwap,
		getJewel:getJewel,
		print:print
	};
})();