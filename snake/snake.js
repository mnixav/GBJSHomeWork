'use strict';

class Matrix {

    constructor (matrixSizeX, matrixSizeY)  {
        this.matrixSizeX = matrixSizeX;
        this.matrixSizeY = matrixSizeY;
        this.squarePositionX = Matrix.getRandomInt(2, matrixSizeX / 2);
        this.squarePositionY = Matrix.getRandomInt(2, matrixSizeY - 1);
        this.score = 0;
        this.moveOnAxisX = true;
        this.moveOnAxisValueUp = true;
    }

    buldMatrix() {
        let body = "";
        for (let i = 1; i <= this.matrixSizeY; i++) {
            let column = "";
            for (let j = 1; j <= this.matrixSizeX; j++) {
                column += '<div id="row' + i +'Column' + j +'"></div>';
            }
            body += (column + "</br>");
        }
        document.body.innerHTML = '<h1 id="h1">Поймайте красный квадрат</h1><article id="article">' + body + '</article>';

        document.getElementById('article').style.width = (34 * this.matrixSizeX) + 'px';

        const self = this;

        function drawWall(y, x, wallIsVertical) {
            while ((wallIsVertical? y : x) <= (wallIsVertical? self.matrixSizeY : self.matrixSizeX)) {
                Matrix.getDiv(y, x).style.backgroundColor = '#e4d7e5';
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

    static getDiv(row, column) {
        return document.getElementById('row' + row + 'Column' + column);
    }

    setPlayerSquare() {
        const div = Matrix.getDiv(this.squarePositionY, this.squarePositionX);
        div.style.backgroundColor = 'black';
    }


    setFinishSquare() {
        const x = Matrix.getRandomInt(2, this.matrixSizeX - 1);
        const y = Matrix.getRandomInt(2, this.matrixSizeY - 1);

        if (x === this.squarePositionX && y === this.squarePositionY) {
            this.setFinishSquare();
        } else {
            const div = Matrix.getDiv(x, y);
            div.style.backgroundColor = 'red';
        }
    }

    setWallSquare() {
        const x = Matrix.getRandomInt(1, this.matrixSizeX);
        let y = Matrix.getRandomInt(1, this.matrixSizeY);

        let div = Matrix.getDiv(x, y);
        if (div.style.backgroundColor === 'red' || div.style.backgroundColor === 'black' || div.style.backgroundColor === 'rgb(228, 215, 229)') {
            this.setWallSquare();
        } else {
            div.style.backgroundColor = '#e4d7e5';
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
        let div = Matrix.getDiv(this.squarePositionY, this.squarePositionX);

        div.style.backgroundColor = null;

        this.moveOnAxisX? (this.moveOnAxisValueUp? this.squarePositionX++ : this.squarePositionX--):(this.moveOnAxisValueUp? this.squarePositionY++ : this.squarePositionY--);

        div = Matrix.getDiv(this.squarePositionY, this.squarePositionX);

        if (div.style.backgroundColor === 'red') {
            this.endGame();
        }
        if (div.style.backgroundColor === 'rgb(228, 215, 229)') {
            this.endGame(true);
        }

        div.style.backgroundColor = 'black';

    }

    endGame(crashed) {
        setTimeout(function() {
            if (crashed) {
                alert("Вы впечатались в стену :(");
                window.document.location.reload(true);
            } else {
                this.score++;
                this.setFinishSquare();
                this.setWallSquare();
                let div = document.getElementById('h1');
                div.innerHTML = 'Квадратов поймано: ' + this.score;
            }

        }.bind(this), 50);
    }

    play() {
        window.onkeydown = function(){
            this.directionCheck();
        }.bind(this);

        setInterval(() => this.squareMove(), 150);
    }
}

window.onload = function() {
    let m1 = new Matrix(18, 18);
    m1.buldMatrix();
    m1.setPlayerSquare();
    m1.setFinishSquare();
    m1.play();
};