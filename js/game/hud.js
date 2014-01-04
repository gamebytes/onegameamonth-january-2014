(function(w, engine) {
    
    var Hud = function() {};
    Hud.elements = {
        hud: document.getElementById('hud'),
        loading: document.getElementById('hud-loading'),
        main: document.getElementById('hud-main')
    };
    Hud._curScreen = Hud.elements.loading;
    
    Hud.gotoScreen = function(newStateStr) {
        Hud._curScreen.style.display = 'none';
        Hud._curScreen = Hud.elements[newStateStr];
        Hud._curScreen.style.display = 'block';
    };
    
    w.Hud = Hud;
    
})(window, window.engine);