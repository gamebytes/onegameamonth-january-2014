(function(w, engine){
    
    var Vector2 = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    };
    
    w.Vector2 = Vector2;
    
    var Rectangle = function(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    };
    
    w.Rectangle = Rectangle;
    
})(window, window.engine);