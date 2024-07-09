import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
    name: String,
    dealDescription: String,
    photo: String,
    price_discount: String,
})

const menuItemSchema = new mongoose.Schema({
    category: String,
    itemName: String,
    description: String,
    photo: String,
    price: String
});

const restaurantSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        categoryList:{
            type: [String],
            //required: false,
        },
        password: {
            type: String,
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                //required: true
            },
            coordinates: {
                type: [Number],
                //required: true
            }
            
        },
        address: String,
        about: String,
        officialEmail: {
            type: String, 
            required: true},
        hotline: String,
        photo: {
            type: String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F27501843-a-cartoon-pizza-character-with-a-cute-face&psig=AOvVaw0NxwDLKmysfdcPfnnFWdeI&ust=1719384059645000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIjDqfOS9oYDFQAAAAAdAAAAABAE"},
        coverPhoto: {
            type: String,
            default: " https://images.unsplash.com/photo-1504674900247-0877df9cc812?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"},
        menu: [menuItemSchema],
        specialDeals: [dealSchema],
    }
);

restaurantSchema.index({ location: '2dsphere'});
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
