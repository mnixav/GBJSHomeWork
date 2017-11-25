class Matrix {

    constructor (matrixSizeX, matrixSizeY)  {
        this.matrixSizeX = matrixSizeX;
        this.matrixSizeY = matrixSizeY;
        this.squarePositionX = Matrix.getRandomInt(2, matrixSizeX / 2);
        this.squarePositionY = Matrix.getRandomInt(2, matrixSizeY - 1);
        this.score = 0;
        this.moveOnAxisX = true;
        this.moveOnAxisValueUp = true;
        this.timerId = null;
        this.login = "";
    }

    buldMatrix() {
        let body = "";
        for (let i = 1; i <= this.matrixSizeY; i++) {
            let column = "";
            for (let j = 1; j <= this.matrixSizeX; j++) {
                column += '<div id="row' + i +'Column' + j +'" class="martixSquare" ></div>';
            }
            body += (column + "</br>");
        }
        $('body').html($('body').html() + '<h1 id="h1">Поймайте красный квадрат</h1><article id="article">' + body + '</article>');

        $('#article').css({width: (34 * this.matrixSizeX) + 'px'});

        const self = this;

        function drawWall(y, x, wallIsVertical) {
            while ((wallIsVertical? y : x) <= (wallIsVertical? self.matrixSizeY : self.matrixSizeX)) {
                Matrix.setDivColor(y, x, 'wall');
                wallIsVertical? y++ : x++;
            }
        }

        drawWall(1, 1, false);
        drawWall(1, 1, true);
        drawWall(this.matrixSizeY, 1, false);
        drawWall(1, this.matrixSizeX, true);
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static setDivColor(row, column, className) {
        $('#row' + row + 'Column' + column).addClass(className);
    }

    static hasDivColor(row, column, className) {
        return $('#row' + row + 'Column' + column).hasClass(className);
    }

    setPlayerSquare() {
        Matrix.setDivColor(this.squarePositionY, this.squarePositionX, 'player');
    }


    setFinishSquare() {
        let x = Matrix.getRandomInt(2, this.matrixSizeX - 1);
        let y = Matrix.getRandomInt(2, this.matrixSizeY - 1);

        if (Matrix.hasDivColor(y, x, 'player') || Matrix.hasDivColor(y, x, 'wall')) {
            this.setFinishSquare();
        } else {
            Matrix.setDivColor(y, x, 'finish');
        }
    }

    setWallSquare() {
        let x = Matrix.getRandomInt(1, this.matrixSizeX);
        let y = Matrix.getRandomInt(1, this.matrixSizeY);

        if (Matrix.hasDivColor(y, x, 'player') || Matrix.hasDivColor(y, x, 'finish') || Matrix.hasDivColor(y, x, 'wall')) {
            this.setWallSquare();
        } else {
            Matrix.setDivColor(y, x, 'wall');
        }
    }


    directionCheck() {
        if (event.keyCode === 37) {
            this.moveOnAxisX = true; this.moveOnAxisValueUp = false;
        }

        if (event.keyCode === 38) {
            this.moveOnAxisX = false; this.moveOnAxisValueUp = false;
        }

        if (event.keyCode === 39) {
            this.moveOnAxisX = true; this.moveOnAxisValueUp = true;
        }

        if (event.keyCode === 40) {
            this.moveOnAxisX = false; this.moveOnAxisValueUp = true;
        }
    }

    squareMove() {

        function removeDivClass (y, x, className) {
            $('#row' + y + 'Column' + x).removeClass(className);
        }

        removeDivClass(this.squarePositionY, this.squarePositionX,'player');

        this.moveOnAxisX? (this.moveOnAxisValueUp? this.squarePositionX++ : this.squarePositionX--):(this.moveOnAxisValueUp? this.squarePositionY++ : this.squarePositionY--);

        if (Matrix.hasDivColor(this.squarePositionY, this.squarePositionX, 'finish')) {
            removeDivClass(this.squarePositionY,this.squarePositionX,'finish');
            this.endGame();
        }
        if (Matrix.hasDivColor(this.squarePositionY, this.squarePositionX, 'wall')) {
            removeDivClass(this.squarePositionY, this.squarePositionX,'wall');
            this.endGame(true);
        }

        Matrix.setDivColor(this.squarePositionY, this.squarePositionX, 'player');

    }

    endGame(crashed) {

        setTimeout(function() {
            if (crashed) {
                $('#h1').html('Вы врезались в стену :(');
                /*window.document.location.reload(true);*/
                this.play(true);
            } else {
                this.score++;
                this.setFinishSquare();
                this.setWallSquare();
                $('#h1').html('Квадратов поймано: ' + this.score);
            }

        }.bind(this), 50);
    }

    play(stopInterval) {

        $('window').keydown(function(){
            this.directionCheck();
        }.bind(this));

        if (stopInterval) {
            clearInterval(this.timerId);
        } else {
            this.timerId = setInterval(() => this.squareMove(), 150);
        }
    }
}