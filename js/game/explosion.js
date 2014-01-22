(function(w, engine) {
    
    var Explosion = function() {
        this.active = false;
        this.rect = new w.Rectangle(0, 0, 64, 64);
        this.image = w.Game.resources.images["./resources/images/explosion.png"];
        
        this._ttlCols = 4;
        this._index = 0;
        this._curFrameTime = 0;
        this._lastFrameTime = 0;
        this._frameTime = 1000 / 12;
        
        this.init = function(x, y) {
            this.active = true;
            this.rect.x = x;
            this.rect.y = y;
            this._index = 0;
            this._lastFrameTime = new Date().getTime();
        };
        
        this.update = function() {
            var col = this._index % this._ttlCols,
                row = Math.ceil(this._index / this._ttlCols);
                
            w.Game.ctx.drawImage(this.image,
                col * 64, row * 64,
                64, 64,
                this.rect.x - 32, this.rect.y - 32,
                64, 64);
            
            var now = new Date().getTime();
            this._curFrameTime += now - this._lastFrameTime;
            this._lastFrameTime = now;
            
            if (this._curFrameTime > this._frameTime) {
                this._curFrameTime -= this._frameTime;
                this._index += 1;
            }
            
            if (this._index > 15) {
                this.active = false;
            }
        };
    };
    
    Explosion._explosions = [];
    Explosion._inactiveExplosions = [];
    
    Explosion.Update = function() {
        Explosion._inactiveExplosions = [];
        Explosion._explosions.forEach(function(explosion, i) {
            if (explosion.active) {
                explosion.update();
            } else {
                Explosion._inactiveExplosions.push(i);
            }
        });
    };
    
    Explosion.New = function(x, y) {
        var newExplosion;
        if (Explosion._inactiveExplosions.length > 0) {
            newExplosion = Explosion._explosions[Explosion._inactiveExplosions.pop()];
        } else {
            newExplosion = new Explosion();
            Explosion._explosions.push(newExplosion);
        }
        
        newExplosion.init(x, y);
    };
    
    w.Explosion = Explosion;
    
})(window, window.engine);