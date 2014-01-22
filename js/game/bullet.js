(function(w, engine) {
    
    var Bullet = function() {
        this.active = false;
        this.rect = new w.Rectangle(0, 0, 3, 5);
        this.speed = 5;
        
        this.init = function(x, y) {
            this.active = true;
            this.rect.x = x;
            this.rect.y = y;
        };
        
        this.update = function() {
            this.rect.y -= this.speed;
            
            w.Game.ctx.fillStyle = "rgb(0,0,0)";  
            w.Game.ctx.fillRect(this.rect.x - (this.rect.width * 0.5),
                this.rect.y - (this.rect.height * 0.5),
                this.rect.width, this.rect.height);
            
            if (this.rect.y + (this.rect.height * 0.5) < 0) {
                this.active = false;
            }
        };
    };
    
    Bullet._bullets = [];
    Bullet._inactiveBullets = [];
    
    Bullet.Update = function() {
        Bullet._inactiveBullets = [];
        Bullet._bullets.forEach(function(bullet, i) {
            if (bullet.active) {
                bullet.update();
            } else {
                Bullet._inactiveBullets.push(i);
            }
        });
    };
    
    Bullet.FireNew = function(x, y) {
        var newBullet;
        if (Bullet._inactiveBullets.length > 0) {
            newBullet = Bullet._bullets[Bullet._inactiveBullets.pop()];
        } else {
            newBullet = new Bullet();
            Bullet._bullets.push(newBullet);
        }
        
        newBullet.init(x, y);
    };
    
    w.Bullet = Bullet;
    
})(window, window.engine);