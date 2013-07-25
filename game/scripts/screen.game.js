jewel.screens["game-screen"] = (function() {
    var board = jewel.board,
        display = jewel.display;

    function run() {
        board.initialize(function() {
            display.initialize(function() {
                display.redraw(board.getBoard(), function() {
                    // Das Spiel starten
                });
            });
        });
    }

    return {
        run : run
    };
})();
