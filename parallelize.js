Parallelize = (function(){
    /* Return type of Parallelize.createThread(): */
    var SimpleThread = function(webWorker){
        var _self = this;
        this.webWorker = webWorker;
        this.callback = false;
        this.webWorker.onmessage = function(event){
            var message = JSON.parse(event.data);
            if(message.return && _self.callback){
                _self.callback(message.return);
            }
        };
    }

    /* Starts the original function with the given parameters: */
    SimpleThread.prototype.start = function(parameters, callback){
        this.callback = callback;

        if(this.webWorker!==null){
            var strParams = JSON.stringify({start: parameters});
            this.webWorker.postMessage(strParams);
        }
    };

    /* Aborts the thread, releasing resources: */
    SimpleThread.prototype.stop = function(){
        if(this.webWorker!==null){
            this.webWorker.terminate();
            this.webWorker = null;
        }
    }

    var Parallelize = function(){};

    /* Receives a function to be executed in another thread.
       This will not start until you call .start([params]) on the 
       returned object. Params must be serializable, local scope will
       be lost and the function will be executed on its own context.
       References to objects outside function's scope will break the code. */
    Parallelize.createThread = function(func) {
        var webWorker = new Worker("worker.js");
        var simpleThread = new SimpleThread(webWorker);
        var strFunction = func.toString();
        
        webWorker.postMessage(JSON.stringify({'function': strFunction}));
        return simpleThread;
    };

    return Parallelize;
})();