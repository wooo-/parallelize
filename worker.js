var target = function(){};

onmessage = function(event){
    var message = JSON.parse(event.data);
    /* Expected messages: 

        {function: functionString}
        {start: arrayWithParams}

    */

    if(message.function){
        var strFunction = 'target = '+message.function;
        eval(strFunction);

    }else if(message.start){
        target.apply(this, message.start);

    }
}