(function(w, engine) {
    
    var Player = function(image, data) {
        this._image = image;
        this._imageSize = new w.Vector2(this._image.width, this._image.height);
        this._data = data;
        this._fireRate = 250;
        this._lastFireTime = 0;
        
        this.active = true;
        this.timeDied;
        this.timeDead = 1000;
        this.lives = 3;
        this.position = null;
        this.speed = 5;
        
        this.init = function() {
            this.position = new w.Vector2(
                (w.Game.stageWidth - this._data.frame.w) * 0.5,
                w.Game.stageHeight - this._data.frame.h
            );
            this._lastFireTime = new Date().getTime();
        };
        
        this.update = function() {
            var now = new Date().getTime();
            if (!this.active) {
                if (this.lives < 0) {
                    w.Hud.showRestart();
                    return;
                }
                
                if ((now - this.timeDied) > this.timeDead) {
                    this.active = true;
                    this.init();
                }
                
                return;
            }
            
            var self = this;
            w.Bullet._bullets.forEach(function(bullet, i) {
                if (!bullet.active || !bullet.isEnemy) { return; }
                var rect = new w.Rectangle(
                    self.position.x + (self._data.frame.w * .5),
                    self.position.y + (self._data.frame.h * .5),
                    self._data.frame.w, self._data.frame.h)
                if (rect.intersects(bullet.rect)) {
                    self.active = false;
                    self.lives -= 1;
                    self.timeDied = now;
                    bullet.active = false;
                    w.Explosion.New(rect.x, rect.y);
                }
            });
            
            if (engine.Keyboard.IsLeft()) {
                this.position.x -= this.speed;
            }
            
            if (engine.Keyboard.IsRight()) {
                this.position.x += this.speed;
            }
            
            if ((this.position.x + this._data.frame.w) > w.Game.stageWidth) {
                this.position.x = w.Game.stageWidth - this._data.frame.w;
            }
            
            if (this.position.x < 0) {
                this.position.x = 0;
            }
            
            if (engine.Keyboard.IsKeyDown(engine.Keys.Space)) {
                if((now - this._lastFireTime) > this._fireRate) {
                    w.Bullet.FireNew(this.position.x + (this._data.frame.w * 0.5), this.position.y);
                    this._lastFireTime = now;
                }
            }
            
            w.Game.ctx.drawImage(this._image,
                this._data.frame.x, this._data.frame.y,
                this._data.frame.w, this._data.frame.h,
                this.position.x, this.position.y,
                this._data.frame.w, this._data.frame.h
            );
        };
    };
    
    w.Player = Player;
    
})(window, window.engine);