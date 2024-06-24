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
        default: "https://thumbs.dreamstime.com/b/default-placeholder-profile-icon-avatar-gray-man-90197957.jpg",
    }
},{timeseries: true}); //the time of creation and the time of edit

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User',userSchema);

export default User;