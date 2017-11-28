
window.onload = function() {
    let initerface = new Interface();
    let m1 = new Matrix();
    m1.buldMatrix(true);
    initerface.getInputOfInitialData(m1);
    m1.setPlayerSquare();
    m1.setFinishSquare();
    /*setTimeout(m1.play, 3000);*/
};