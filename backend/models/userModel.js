import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F27501843-a-cartoon-pizza-character-with-a-cute-face&psig=AOvVaw0NxwDLKmysfdcPfnnFWdeI&ust=1719384059645000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIjDqfOS9oYDFQAAAAAdAAAAABAE",
    }
},{timeseries: true}); //the time of creation and the time of edit

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User',userSchema);

export default User;