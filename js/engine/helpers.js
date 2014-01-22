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
        
        this.intersects = function(other) {
            return !(this.x - (this.width * 0.5) > other.x - (other.width * 0.5) ||
                    this.x + (this.width * 0.5) < other.x - (other.width * 0.5) ||
                    this.y - (this.height * 0.5) > other.y + (other.height * 0.5) ||
                    this.y + (this.height * 0.5) < other.y - (other.height * 0.5));
        };
    };
    
    w.Rectangle = Rectangle;
    
})(window, window.engine);