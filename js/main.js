if (!window.engine) window.engine = {};

var game = {
    stageWidth: 0,
    stageHeight: 0,
    ctx: null,
    
    init: function() {
        var cvs = document.getElementById('stage');
        this.ctx = cvs.getContext('2d');
        this.stageWidth = cvs.width;
        this.stageHeight = cvs.height;
        
        this.loadResources();
    },
    
    loadResources: function() {
        var loader = new engine.ResourceManager();
        
        loader.addJson("./resources/images/planes.json");
        loader.addImage("./resources/images/planes.png");
        
        loader.load().then(function(results) {
            console.log("All Loaded. Awesome!");
        });
    }
};

window.addEventListener("load", function() { game.init() });