(function(w, engine) {
    
    var Bullet = function() {
        this.active = false;
        this.position = new w.Vector2();
        this.size = new w.Vector2(3, 5);
        this.speed = 5;
        
        this.init = function(x, y) {
            this.active = true;
            this.position = new w.Vector2(x, y);
        };
        
        this.update = function() {
            this.position.y -= this.speed;
            
            if (this.position.y + (this.size.y * 0.5) < 0) {
                this.active = false;
                return;
            }
            
            w.Game.ctx.fillStyle = "rgb(0,0,0)";  
            w.Game.ctx.fillRect(this.position.x - (this.size.x * 0.5),
                this.position.y - (this.size.y * 0.5),
                this.size.x, this.size.y);
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
            console.log("Used Existing bullet");
        } else {
            newBullet = new Bullet();
            Bullet._bullets.push(newBullet);
            console.log("Created a new bullet");
        }
        
        newBullet.init(x, y);
    };
    
    w.Bullet = Bullet;
    
})(window, window.engine);