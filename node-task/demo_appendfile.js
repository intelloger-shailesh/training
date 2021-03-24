var fs = require('fs');

fs.appendFile('write_demo1','Appended Successfully..',function(err){
    if(err){
        console.log('Errot');
    }
    else{console.log('Data Saved');}
    

})