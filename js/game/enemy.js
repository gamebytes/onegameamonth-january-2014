(function(w, engine) {
    
    var Enemy = function() {
        this.active = false;
        this.initPosition = new w.Vector2();
        this.rotation = 180;
        this._scale = 0.5;
        this._image = null;
        this._data = {};
        this.rect = new w.Rectangle();
        
        this.init = function(image, data) {
            this._image = image;
            this._data = data;
            this.rect.x = this.initPosition.x;
            this.rect.y = this.initPosition.y;
            this.rect.width = this._data.frame.w * this._scale;
            this.rect.height = this._data.frame.h * this._scale;
            this.launch();
        };
        
        this.launch = function() {
            this.active = true;
            this.rect.x = this.initPosition.x;
            this.rect.y = this.initPosition.y;
        };
        
        this.update = function() {
            var self = this;
            w.Bullet._bullets.forEach(function(bullet, i) {
                if (!bullet.active) { return; }
                if (self.rect.intersects(bullet.rect)) {
                    self.active = false;
                    bullet.active = false;
                    w.Explosion.New(self.rect.x, self.rect.y);
                }
            });
            
            this.rect.y += 0.5;
            
            w.Game.ctx.translate(this.rect.x, this.rect.y);
            w.Game.ctx.rotate(Math.PI / 180 * this.rotation);
            
            w.Game.ctx.drawImage(this._image,
                this._data.frame.x, this._data.frame.y,
                this._data.frame.w, this._data.frame.h,
                -(this.rect.width * 0.5), -(this.rect.height * 0.5),
                this.rect.width, this.rect.height
            );
            
            w.Game.ctx.rotate(Math.PI / 180 * -this.rotation);
            w.Game.ctx.translate(-this.rect.x, -this.rect.y);
            
            if (this.rect.y - (this.rect.height * 0.5) > w.Game.stageHeight) {
                this.active = false;
            }
        };
        
    };
    
    Enemy._enemies = [];
    Enemy._inactiveEnemies = [];
    Enemy._cellSize = new w.Vector2(110, 110);
    
    Enemy.Init = function(image, data) {
        var numCellsX = Math.floor(w.Game.stageWidth / Enemy._cellSize.x) - 2;
        var curPlane = 1;
        for (var i = 0; i < 2; i += 1) {
            var planeData = data.frames["plane_" + curPlane];
            for (var j = 1; j <= numCellsX; j += 1) {
                
                var e = new Enemy(image, planeData);
                e.initPosition.x = (j * Enemy._cellSize.x) + (Enemy._cellSize.x * 0.5);
                e.initPosition.y = -((i * Enemy._cellSize.y) + (Enemy._cellSize.y * 0.5));
                e.init(image, planeData);
                Enemy._enemies.push(e);
                
            }
            curPlane += 1;
        }
    };
    
    Enemy.Update = function() {
        Enemy._inactiveEnemies = [];
        Enemy._enemies.forEach(function(enemy, i) {
            if (enemy.active) {
                enemy.update();
            } else {
                Enemy._inactiveEnemies.push(i);
            }
        });
        
        if (Enemy._inactiveEnemies.length == Enemy._enemies.length) {
            Enemy.LaunchFormation();
        }
    };
    
    Enemy.LaunchFormation = function() {
        Enemy._enemies.forEach(function(enemy, i) {
            enemy.launch();
        });
    };
    
    w.Enemy = Enemy;
    
})(window, window.engine);