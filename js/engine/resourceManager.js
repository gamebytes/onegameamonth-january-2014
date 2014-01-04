if (!window.engine) window.engine = {};

(function(window, engine) {
    
    engine.ResourceManager = function() {
        this._imagesToLoad = [];
        this.loadedImages = {};
        
        this._jsonToLoad = [];
        this.loadedJson = {};
        
        this.addJson = function(jsonUrl) {
            this._jsonToLoad.push(jsonUrl);
        };
        
        this.addImage = function(imgUrl) {
            this._imagesToLoad.push(imgUrl);
        };
        
        this.load = function() {
            var ths = this;
            return new window.Promise(function(resolve, reject) {
                var imgPromises = [],
                    jsonPromises = [];
                
                ths._imagesToLoad.forEach(function(url) {
                    (function(url){
                        var promise = getImage(url);
                        promise.then(function(img) {
                            ths.loadedImages[url] = img;
                            ths._resourceLoaded();
                        });
                        imgPromises.push(promise);
                    })(url);
                });
                
                ths._jsonToLoad.forEach(function(url) {
                    var promise = getJson(url);
                    promise.then(function(json) {
                        ths.loadedJson[url] = json;
                        ths._resourceLoaded();
                    });
                    jsonPromises.push(promise);
                });
                
                window.Promise.all(imgPromises.concat(jsonPromises)).then(function(results) {
                    resolve(results);
                }).catch(function(err) {
                    reject(err);
                });
            });
        };
        
        this._resourceLoaded = function() {
            var loaded, total;
            
            loaded = Object.size(this.loadedJson) + Object.size(this.loadedImages);
            total = this._jsonToLoad.length + this._imagesToLoad.length;
            
            window.PubSub.publish("ResourceManager.resourceLoaded", {loaded: loaded, total: total});
        }
        
        /*
         * Request Processing
         */
        
        function getImage(url) {
            return new window.Promise(function(resolve, reject) {
                var img = new Image();
                
                img.addEventListener('load', function() {
                    resolve(img);
                });
                
                img.addEventListener('error', function() {
                    reject(Error("Image Load Error"));
                });
                
                img.src = url;
            });
        }
        
        function get(url) {
            return new window.Promise(function(resolve, reject) {
                var req = new window.XMLHttpRequest();
                req.open('GET', url);
                
                req.addEventListener('load', function() {
                    if (req.status === 200) {
                        resolve(req.response);
                    } else {
                        reject(Error(req.statusText));
                    }
                });
                
                req.addEventListener('error', function() {
                     reject(Error("Network Error"));
                });
                
                req.send();
            })
        }
        
        function getJson(url) {
            return get(url).then(JSON.parse);
        }
    };
    
})(window, window.engine);