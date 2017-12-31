var satrt, finish;


start = new Date();
console.log('Start - Block');

//Import Lib. 
var fs = require('fs');

//Blocking Code

//Read file
var fileRead = fs.readFileSync('text.txt','utf8');
console.log(fileRead);

//Get finish date
finish = new Date();
console.log('Execute Time: ' + (finish.getTime() - start.getTime()) + ' mili-seg');


console.log('------------------------------');
//Non-Blocking Code
start = new Date();
console.log('Start - NoNBlock');

fs.readFile('text.txt','utf8',function(error, data){
    console.log(data);
});

finish = new Date();
console.log('Execute Time: ' + (finish.getTime() - start.getTime()) + ' mili-seg');
