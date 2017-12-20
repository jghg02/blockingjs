var satrt, finish;

start = new Date();
console.log('Start - Block');

var fs = require('fs');
var fileRead = fs.readFileSync('text.txt','utf8');
console.log(fileRead);


finish = new Date();
console.log('Execute Time: ' + (finish.getTime() - start.getTime()) + ' mili-seg');


console.log('------------------------------');
start = new Date();
console.log('Start - NoNBlock');

fs.readFile('text.txt','utf8',function(error, data){
    console.log(data);
});

finish = new Date();
console.log('Execute Time: ' + (finish.getTime() - start.getTime()) + ' mili-seg');