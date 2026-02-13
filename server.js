require("dotenv").config();

const app=require('./src/app')
const connectDB = require("./src/config//db")

const port = process.env.Port || 5000;

connectDB();

app.listen(port,()=>{
    console.log("server is running");
})