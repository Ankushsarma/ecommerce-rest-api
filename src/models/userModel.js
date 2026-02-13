const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const { resetPassword } = require("../contoller/authController");

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true,
            minlength:6,
            select:false  // new thing
        },
        role:{
            type:String,
            enum:["user","admin","seller"],
            default:"user"
        },
        resetpasswordToken:String,
        resetPasswordExpire:Date,
    },
    { timestamps:true} // new thing
)

// password hashing

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bycrypt.hash(this.password,10);
    next()
})

// compare password
userSchema.method.comparePassword=async function(password){
    return bycrypt.compare(password,this.password);
}

module.exports =mongoose.model("user",userSchema);