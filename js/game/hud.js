(function(w, engine) {
    
    var Hud = function() {};
    Hud.elements = {
        hud: document.getElementById('hud'),
        loading: document.getElementById('hud-loading'),
        main: document.getElementById('hud-main'),
        score: document.getElementById('hud-main-score'),
        restartBtn: document.getElementById('restart')
    };
    Hud._curScreen = Hud.elements.loading;
    
    Hud.elements.restartBtn.style.display = 'none';
    Hud.elements.restartBtn.addEventListener('click', restart);
    
    Hud.gotoScreen = function(newStateStr) {
        Hud._curScreen.style.display = 'none';
        Hud._curScreen = Hud.elements[newStateStr];
        Hud._curScreen.style.display = 'block';
    };
    
    Hud.setScore = function(points) {
        Hud.elements.score.innerHTML = points + parseInt(Hud.elements.score.innerHTML);
    };
    
    Hud.showRestart = function() {
        Hud.elements.restartBtn.style.display = 'block';
    }
    
    function restart() {
        w.location = w.location;
    }
    
    w.Hud = Hud;
    
})(window, window.engine);