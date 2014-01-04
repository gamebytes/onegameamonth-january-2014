(function(w, engine) {
    
    var Player = function(image, data) {
        this._image = image;
        this._imageSize = new w.Vector2(this._image.width, this._image.height);
        this._data = data;
        
        this.position = null;
        this.speed = 5;
        
        this.init = function() {
            this.position = new w.Vector2(
                (w.Game.stageWidth - this._data.frame.w) * 0.5,
                w.Game.stageHeight - this._data.frame.h
            );
        };
        
        this.update = function() {
            
            if (w.Game.curKeyboardState.IsLeft()) {
                this.position.x -= this.speed;
            }
            
            if (w.Game.curKeyboardState.IsRight()) {
                this.position.x += this.speed;
            }
            
            if ((this.position.x + this._data.frame.w) > w.Game.stageWidth) {
                this.position.x = w.Game.stageWidth - this._data.frame.w;
            }
            
            if (this.position.x < 0) {
                this.position.x = 0;
            }
            
            w.Game.ctx.drawImage(this._image,
                this._data.frame.x, this._data.frame.y,
                this._data.frame.w, this._data.frame.h,
                this.position.x, this.position.y,
                this._data.frame.w, this._data.frame.h);
        };
    };
    
    w.Player = Player;
    
})(window, window.engine);