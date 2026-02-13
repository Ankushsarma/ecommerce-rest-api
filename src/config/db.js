const mongoose = require("mongoose");

const connectDB = async ()=>{
try{
const conn = await mongoose.connect(process.env.MONGO_URI);

console.log("mongodb is connected");

}
    catch(error){
        console.log('mongoDB failed to connect');
        console.log(error);
        
    }

} 
module.exports=connectDB 