if (!window.engine) window.engine = {};

window.GameClass = function() {
    this.ctx = null;
    this.stageWidth = 0;
    this.stageHeight = 0;
    this.resources = {};
    
    this.waves = null;
    this.player = null;
    
    this.init = function() {
        var cvs = document.getElementById('stage');
        this.ctx = cvs.getContext('2d');
        this.stageWidth = cvs.width;
        this.stageHeight = cvs.height;
        
        window.engine.Keyboard.Init();
        
        this.loadResources();
    };
    
    this.loadResources = function() {
        var loader = new window.engine.ResourceManager(),
            ths = this;
        
        loader.addJson("./resources/images/planes.json");
        
        loader.addImage("./resources/images/planes.png");
        loader.addImage("./resources/images/waves.gif");
        loader.addImage("./resources/images/explosion.png");
        
        loader.load().then(function(results) {
            ths.resources.images = loader.loadedImages;
            ths.resources.json = loader.loadedJson;
            
            ths.waves = new window.Waves(ths.resources.images["./resources/images/waves.gif"]);
            ths.waves.init();
            
            window.Enemy.Init(
                ths.resources.images["./resources/images/planes.png"],
                ths.resources.json["./resources/images/planes.json"]
            );
            
            ths.player = new window.Player(
                ths.resources.images["./resources/images/planes.png"],
                ths.resources.json["./resources/images/planes.json"].frames.plane_0
            );
            ths.player.init();
            
            window.Hud.gotoScreen('main');
            
            window.requestAnimationFrame(ths.update.bind(ths));
        });
    };
    
    this.update = function() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        
        window.engine.Keyboard.Update();
        
        this.waves.update();
        window.Bullet.Update();
        window.Enemy.Update();
        window.Explosion.Update();
        this.player.update();
        
        window.requestAnimationFrame(this.update.bind(this));
    };
};

window.addEventListener("load", function() {
    window.Game = new window.GameClass();
    window.Game.init();
});

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};