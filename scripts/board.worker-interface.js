// board.worker-interface.js

console.log("Board: Using webworkers.");

jewel.board = (function(){
	var dom = jewel.dom,settings,worker,messageCount,callbacks;

	function initialize(callback) {
		settings = jewel.settings;
		rows = settings.rows;
		cols = settings.cols;
		messageCount = 0;
		callbacks = [];
		worker = new Worker("scripts/board.worker.js");

		dom.bind(worker,"message",messageHandler);
		post("initialize",jewel.settings,callback);
	}

	function post(command,data,callback) {
		callbacks[messageCount] = callback;
		worker.postMessage({
			'id': messageCount,
			'command': command,
			'data': data
		});
		messageCount++;
	}

	function messageHandler(event) {
		var message = event.data;

		jewels = message.jewels;

		if (callback[message.id]) {
			callbacks[message.id](message.data);
			delete callbacks[message.id];
		}
	}

	function swap(x1,y1,x2,y2,callback) {
		post("swap",{
			'x1': x1,
			'y1': y1,
			'x2': x2,
			'y2': y2
		},callback);
	}

	function getBoard() {
		var copy = [],x;

		for (x = 0; x < cols; x++) {
			copy[x] = jewels[x].slice(0);
		}
		return copy;
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
		'initialize': initialize,
		'swap': swap,
		'getBoard': getBoard,
		'print': print
	};

})();