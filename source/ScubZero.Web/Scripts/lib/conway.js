/**
 * @author apalmer
 * 
 * Exploring Javascript object orientation
 */

function Conway(rows, columns) {

    var currGeneration = initializeGeneration();
    var lastGeneration = initializeGeneration();
    var viewData;
    var view = initializeView();
    var intervalId;

    this.init = function () {
        updateView();
    };

    this.getView = function () {
        return view;
    };

    function randomize() {
        randomizer();
        updateView();
    }

    function start() {
        intervalId = setInterval(
            function () {
                generate();
            },
            33);
    };

    var stop = function () {
        clearInterval(intervalId);
    };
    
    function generate() {
        clone(currGeneration);
        updateGeneration();
        updateView();
    }

    function randomizer() {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                if (Math.random() >= 0.5) {
                    currGeneration[i][j] = 1;
                }
                else {
                    currGeneration[i][j] = 0;
                }
            }
        }
    }

    function updateView() {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {

                var cell = viewData[i][j];

                if (currGeneration[i][j] == 1) {
                    cell.removeClass('dead');
                    cell.addClass('alive');
                }
                else {
                    cell.removeClass('alive');
                    cell.addClass('dead');
                }
            }
        }
    }

    function clone(generation) {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                if (generation[i][j] == 1) {
                    lastGeneration[i][j] = 1;
                }
                else {
                    lastGeneration[i][j] = 0;
                }
            }
        }
    }

    function updateGeneration() {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {

                var numNeighbors = countLivingNeighbors(lastGeneration, i, j);

                if (numNeighbors < 2) {
                    currGeneration[i][j] = 0;
                }
                if (numNeighbors == 3) {
                    currGeneration[i][j] = 1;
                }
                if (numNeighbors > 3) {
                    currGeneration[i][j] = 0;
                }
            }
        }
    }

    function countLivingNeighbors(generation, i, j) {
        var maxRows = rows - 1;
        var maxCols = columns - 1;
        var left = i - 1;
        if (left < 0) {
            left = maxCols;
        }
        var right = i + 1;
        if (right > maxCols) {
            right = 0;
        }
        var top = j - 1;
        if (top < 0) {
            top = maxRows;
        }
        var bottom = j + 1;
        if (bottom > maxRows) {
            bottom = 0;
        }

        var count = 0;
        count += generation[left][top];
        count += generation[i][top];
        count += generation[right][top];
        count += generation[left][j];
        count += generation[right][j];
        count += generation[left][bottom];
        count += generation[i][bottom];
        count += generation[right][bottom];

        return count;
    }

    function initializeGeneration() {
        var generation = new Array();
        for (var i = 0; i < rows; i++) {
            generation[i] = new Array();
            for (var j = 0; j < columns; j++) {
                generation[i][j] = 0;
            }
        }
        return generation;
    }

    function initializeView() {
        var container = $('<table>');
        var layoutRow = $('<tr>');
        var controlContainer = $('<td>');
        var gridContainer = $('<td>');

        var grid = initializeGrid();
        var controls = initializeControls();

        gridContainer.append(grid);
        layoutRow.append(gridContainer);
        controlContainer.append(controls);
        layoutRow.append(controlContainer);
        container.append(layoutRow);

        return container;
    }

    function initializeGrid() {
        var tbl = $('<table>');
        tbl.addClass('grid');
        viewData = new Array();
        for (var i = 0; i <= rows; i++) {
            var row = $('<tr>');
            viewData[i] = new Array();
            for (var j = 0; j <= columns; j++) {
                var cell = $('<td>');
                cell.addClass('cell');
                cell.click(flip(i,j));
                viewData[i][j] = cell;
                row.append(cell);
            }
            tbl.append(row);
        }
        return tbl;
    }

    function flip(i,j) {
        return function () {
            var cell = viewData[i][j];

            if ( currGeneration[i][j] == 1) {
                currGeneration[i][j] = 0;
                cell.removeClass('alive');
                cell.addClass('dead');
            }
            else {
                currGeneration[i][j] = 1;
                cell.removeClass('dead');
                cell.addClass('alive');
            }

        };
    };

    function initializeControls() {
        var container = $('<div>');
        var startButton = $('<input type="button" value="Start"></input>');
        var stopButton = $('<input type="button" value="Stop"></input>');
        var randomButton = $('<input type="button" value="Randomize"></input>');

        startButton.click(function () {
            start(); 
            startButton.attr('disabled', 'disabled');
            stopButton.removeAttr('disabled'); 
        });

        stopButton.click(function () {
            stop();
            stopButton.attr('disabled', 'disabled');
            startButton.removeAttr('disabled'); 
         });

        randomButton.click(function () { randomize() });

        container.append(startButton);
        container.append($('<br/>'));
        container.append(stopButton);
        container.append($('<br/>'));
        container.append(randomButton);
        container.append($('<br/>'));

        return container;
    }
};

