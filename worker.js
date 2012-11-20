target = null;
onmessage = function(event){
    var message = JSON.parse(event.data);
    /* Expected messages: 

        {function: functionString}
        {start: arrayWithParams}

    */

    if(message.function){
        var strFunction = 'target = '+event.data.function;
        eval(strFunction);

    }else if(message.start){
        target.apply(this, message.start);

    }
}