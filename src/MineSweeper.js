var MineSweeper = (function () {
    function MineSweeper() {
    }
    MineSweeper.initializeDead = function (grid) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                grid[i][j] = ".";
            }
        }
    };
    MineSweeper.printgrid = function (grid) {
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                console.info(grid[i][j]);
            }
            console.info();
        }
    };
    MineSweeper.getlivecount = function (gridrow, gridcol, grid) {
        var livecount = 0;
        for (var x = Math.max(0, gridrow - 1); x <= Math.min(gridrow + 1, grid.length - 1); x++) {
            for (var y = Math.max(0, gridcol - 1); y <= Math.min(gridcol + 1, grid[0].length - 1); y++) {
                if (x !== gridrow || y !== gridcol) {
                    if ((function (o1, o2) { if (o1 && o1.equals) {
                        return o1.equals(o2);
                    }
                    else {
                        return o1 === o2;
                    } })(grid[x][y].toString(), "*")) {
                        livecount = livecount + 1;
                    }
                }
            }
        }
        return livecount;
    };
    MineSweeper.gen2nd = function (grid) {
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
        MineSweeper.initializeDead(grid2ndgen);
        var livecount = 0;
        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                livecount = MineSweeper.getlivecount(i, j, grid);
                if (!(function (o1, o2) { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(grid[i][j], "*"))
                    grid2ndgen[i][j] = ('' + (livecount));
                else
                    grid2ndgen[i][j] = "*";
            }
        }
        return grid2ndgen;
    };
    MineSweeper.main = function (args) {
        var grid = [["*", ".", ".", "."], [".", ".", ".", "."], [".", "*", ".", "."], [".", ".", ".", "."]];
        var result = MineSweeper.gen2nd(grid);
        MineSweeper.printgrid(result);
    };
    return MineSweeper;
}());
MineSweeper["__class"] = "MineSweeper";
MineSweeper.main(null);
