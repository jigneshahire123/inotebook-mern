const mongoose=require('mongoose')
const uri="mongodb://localhost:27017"

const connectToMongo=()=>{
    mongoose.connect(uri)
    mongoose.connection.on('connected', () => console.log('connected'));
}


module.exports=connectToMongo;
