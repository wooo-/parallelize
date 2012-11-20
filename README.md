Parallelize
===========

Javascript library for easy multithreading using web workers.

With Parallelize you can run anonymous functions on new threads without creating a new file each time you need to call new Worker().

Sample code
-----------
```javascript
var thread = Parallelize.createThread(function(max){
    var sum = 0;
    for(var i = 0; i < max; ++i){
        sum += Math.sqrt(i);
    }
    return sum;
});

thread.start([123456789], function(sum){
    alert(sum);
});
```