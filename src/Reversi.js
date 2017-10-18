var Reversi = (function () {
    function Reversi() {
    }
    Reversi.initializeOriginal = function (grid, grid2nd) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                grid2nd[i][j] = grid[i][j];
            }
        }
    };
    Reversi.printgrid = function (grid) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                document.write(grid[i][j]);
            }
            console.info();
        }
    };
    Reversi.opponentpos = function (gridrow, gridcol, grid, grid2nd, Who) {
        for (var x = Math.max(0, gridrow - 1); x <= Math.min(gridrow + 1, grid.length - 1); x++) {
            for (var y = Math.max(0, gridcol - 1); y <= Math.min(gridcol + 1, grid[0].length - 1); y++) {
                if ((x !== gridrow || y !== gridcol) && ((x + y) !== (gridrow + gridcol) || (x + y) !== (gridrow + gridcol + 2) || (x + y) !== (gridrow + gridcol - 2))) {
                  
                    if((grid[x][y] == "W" && Who == "B" && grid[gridrow][gridcol] == "B") || (grid[x][y] == "B" && Who == "W" && grid[gridrow][gridcol] == "W")) {
                      console.info("Here");
                        if (x < gridrow && x - 1 >= 0)
                            grid2nd[x - 1][y] = "0";
                        else if (x > gridrow && x + 1 < grid.length)
                            grid2nd[x + 1][y] = "0";
                        else if (y < gridcol && y - 1 >= 0)
                            grid2nd[x][y - 1] = "0";
                        else if (y > gridcol && y + 1 < grid[0].length)
                            grid2nd[x][y + 1] = "0";
                    }
                }
            }
        }
        return grid2nd;
    };
    Reversi.gen2nd = function (grid, WhosChance) {
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
        Reversi.initializeOriginal(grid, grid2ndgen);
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                grid2ndgen = Reversi.opponentpos(i, j, grid, grid2ndgen, WhosChance);
            }
        }
        return grid2ndgen;
    };
    Reversi.main = function (args) {
        var grid = [[".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", "B", "W", ".", ".", "."], [".", ".", ".", "W", "B", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", "."], [".", ".", ".", ".", ".", ".", ".", "."]];
        var who = "B";
        var result = Reversi.gen2nd(grid, who);
        Reversi.printgrid(result);
    };
    return Reversi;
}());
Reversi["__class"] = "Reversi";
Reversi.main(null);