if (!window.engine) window.engine = {};

(function(window, engine) {
    
    engine.ResourceManager = function() {
        this._imagesToLoad = [];
        this._loadedImages = {};
        
        this._jsonToLoad = [];
        this._loadedJson = {};
        
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
                
                ths._imagesToLoad.every(function(url) {
                    var promise = getImage(url);
                    promise.then(function(img) {
                        ths._loadedImages[url] = img;
                    });
                    imgPromises.push(promise);
                });
                
                ths._jsonToLoad.every(function(url) {
                    var promise = getJson(url);
                    promise.then(function(json) {
                        ths._loadedJson[url] = json;
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