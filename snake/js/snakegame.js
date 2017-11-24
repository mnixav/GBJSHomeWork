'use strict';

window.onload = function() {
    let m1 = new Matrix(18, 18);
    m1.buldMatrix();
    m1.setPlayerSquare();
    m1.setFinishSquare();
    m1.play();
};