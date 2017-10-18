var GameOfLife = (function () {
    function GameOfLife() {
    }
    GameOfLife.initializeDead = function (grid) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                grid[i][j] = ".";
            }
        }
    };
    GameOfLife.printgrid = function (grid) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                console.log(grid[i][j]);
            }
            console.info();
        }
    };
    GameOfLife.getlivecount = function (gridrow, gridcol, grid) {
        var livecount = 0;
        for (var x = Math.max(0, gridrow - 1); x <= Math.min(gridrow + 1, grid.length - 1); x++) {
            for (var y = Math.max(0, gridcol - 1); y <= Math.min(gridcol + 1, grid[0].length - 1); y++) {
                if (x !== gridrow || y !== gridcol) {
                    if (grid[x][y] == "*") {
                        livecount = livecount + 1;
                    }
                }
            }
        }
        return livecount;
    };
    GameOfLife.gen2nd = function (grid) {
        var grid2ndgen = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
            return undefined;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([grid.length, grid[0].length]);
        GameOfLife.initializeDead(grid2ndgen);
        var livecount = 0;
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                livecount = GameOfLife.getlivecount(i, j, grid);
                if (grid[i][j] == "*") {
                    grid2ndgen[i][j] = livecount < 2 ? "." : "*";
                    grid2ndgen[i][j] = livecount > 3 ? "." : "*";
                    grid2ndgen[i][j] = (livecount >= 2 && livecount <= 3) ? "*" : ".";
                }
                else if (grid[i][j] == ".") {
                    grid2ndgen[i][j] = livecount === 3 ? "*" : ".";
                }
            }
        }
        return grid2ndgen;
    };
    GameOfLife.main = function (args) {
        var grid = [[".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", "*", ".", ".", "."], [".", ".", ".", "*", "*", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", "."]];
        console.info("First gen:");
        GameOfLife.printgrid(grid);
        var result = GameOfLife.gen2nd(grid);
        console.info("Second gen:");
        GameOfLife.printgrid(result);
    };
    return GameOfLife;
}());
GameOfLife["__class"] = "GameOfLife";
GameOfLife.main(null);
