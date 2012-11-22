var target = function(){};

onmessage = function(event){
    var message = event.data;
    /* Expected messages: 

        {function: functionString}
        {start: arrayWithParams}

    */

    if(message.func){
        var strFunction = 'target = ' + message.func;
        eval(strFunction);

    }else if(message.start){
        var output = target.apply(this, message.start);
        postMessage({ret: output});
    }
}