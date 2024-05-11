import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"user name is required"],
        lowercase:true
        },
        email:{
            type:String,
            unique:true,
            required:[true,"email is required"],
            lowercase:true,
        },
        phoneNumber:{
            type:String,
            unique:true,
            required:[true,"phone number is required"]
        },
        dob:{
            type:Date,
            required:[true,"date of birth is required"]
        },
        password:{
            type:String,
            required:[true,"password is required"],

        },

        refreshToken: {
            type: String
        },
        
},{timestamps:true})

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()
})

UserSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password)

}
UserSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        phoneNumber:this.phoneNumber

    },process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
};
UserSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
       

    },process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
};


const UserDetails=mongoose.model("UserDetail",UserSchema)
export default UserDetails;