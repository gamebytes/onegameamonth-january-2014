(function(w, engine){
    var Waves = function(image) {
        this._image = image;
        this._imageSize = new w.Vector2(this._image.width, this._image.height);
        this._positions = [];
        
        this.speed = 1;
        this.numAcross = 0;
        this.numDowm = 0;
        this.numDownRound = 0;
        
        this.maxYPos = 0;
        this.yHeight = 0;
        
        this.init = function() {
            this.numAcross = Math.ceil(w.Game.stageWidth / this._image.width);
            this.numDown = (w.Game.stageHeight / this._image.height) + (this._image.height * 2);
            this.numDownRound = Math.ceil(this.numDown);
            
            for (var i = 0; i < this.numDownRound; i += 1) {
                for (var j = 0; j < this.numAcross; j += 1) {
                    var pos = new w.Vector2();
                    
                    pos.x = j * this._image.width;
                    pos.y = (i * this._image.height) - this._image.height;
                    
                    this._positions.push(pos);
                }
            }
            
            this.maxYPos = ((this.numDownRound - 1) * this._image.height);
            this.yHeight = ((this.numDownRound) * this._image.height);
        };
        
        this.update = function() {
            this._positions.forEach(updateEachPosition, this);
        };
        
        function updateEachPosition(curPos) {
            curPos.y += this.speed;
            
            if (curPos.y > this.maxYPos) {
                curPos.y -= this.yHeight;
            }
            
            w.Game.ctx.drawImage(this._image,
                curPos.x, curPos.y,
                this._imageSize.x, this._imageSize.y);
        }
    };
    
    w.Waves = Waves;
})(window, window.engine);