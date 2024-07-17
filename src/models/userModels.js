import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {ApiError} from "../utils/apiError.js"
import jwt from "jsonwebtoken";

const EmployeeDetailSchema = mongoose.Schema({
    username: {
        type:String, 
        required:[true, "this field is required"],
        unique : [true, "Username already exits"]
    },
    fullname: {
        type:String, 
        required:[true, "this field is required"]
    },
    email : {
        type:String, 
        required:[true, "this field is required"]
    },
    empId : {
        type:String, 
        required :[true, "this field is required"],
        unique : [true, "Username already exits"]
    },
    password : {
        type:String, 
        required:[true, "this field is required"]
    },
    department : {
        type:String, 
        required:[true, "this field is required"]
    },
    position : {
        type:String, 
        required:[true, "this field is required"]
    },
    branch : {
        type:String, 
    },
    head_of_department : {
        type:String, 
    },
    avatar : {
        type:String, 
    },
    refreshToken : {
        type:String
    },
    lastLogin : {
        type: Date,
        default : null
    }

})


// hash password
EmployeeDetailSchema.pre("save", async function (next) {
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

// custom method :
// for match password
EmployeeDetailSchema.methods.IsPasswordCorrect = function (password) {
    if(!password){
        return new ApiError(400, "password not receive")
    }
    return bcrypt.compare(password, this.password)
}

// refresh token and access token

EmployeeDetailSchema.methods.GenrateRefreshToken = function() {
    return jwt.sign(
        {
            _id : this._id,
            username : this.username
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

EmployeeDetailSchema.methods.GenrateAccessToken = function() {
    return jwt.sign(
        {
            _id : this._id, 
            username : this.username,
            fullname : this.fullname, 
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


export const EmployeeDetail = new mongoose.model('EmployeeDetail', EmployeeDetailSchema);
