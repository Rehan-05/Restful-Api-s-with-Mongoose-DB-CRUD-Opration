const mongooes = require('mongoose');

async function main(){
    try{
        const result =  await mongooes.connect('mongodb://localhost:27017/student-api')
        console.log("result DB successful");
    }catch(err){
        console.log(err);
    }
};
main();


