import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: [true, "Please provide a username"],
        unique: true,
    },
    email:{
        type: String,
        require: [true, "Please provide a email"],
        unique: true
    },
    password:{
        type: String,
        require:[true, "Please provide a password"],
    },
    isVerfied:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verfityToken: String,
    verfityTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;