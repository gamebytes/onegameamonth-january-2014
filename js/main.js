if (!window.engine) window.engine = {};

window.GameClass = function() {
    this.ctx = null;
    this.stageWidth = 0;
    this.stageHeight = 0;
    this.resources = {};
    
    this.curKeyboardState = null;
    this.prevKeyboardState = null;
    
    this.waves = null;
    this.player = null;
    
    this.init = function() {
        var cvs = document.getElementById('stage');
        this.ctx = cvs.getContext('2d');
        this.stageWidth = cvs.width;
        this.stageHeight = cvs.height;
        
        window.engine.Keyboard.Init();
        this.curKeyboardState = window.engine.Keyboard.GetState();
        this.prevKeyboardState = this.curKeyboardState;
        
        this.loadResources();
    };
    
    this.loadResources = function() {
        var loader = new window.engine.ResourceManager(),
            ths = this;
        
        loader.addJson("./resources/images/planes.json");
        
        loader.addImage("./resources/images/planes.png");
        loader.addImage("./resources/images/waves.gif");
        
        loader.load().then(function(results) {
            ths.resources.images = loader.loadedImages;
            ths.resources.json = loader.loadedJson;
            
            ths.waves = new window.Waves(ths.resources.images["./resources/images/waves.gif"]);
            ths.waves.init();
            
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
        
        this.curKeyboardState = window.engine.Keyboard.GetState();
        
        this.waves.update();
        this.player.update();
        
        this.prevKeyboardState = this.curKeyboardState;
        
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