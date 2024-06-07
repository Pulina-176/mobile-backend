import mongoose from "mongoose";

const dealSchema = new mongoose.Schema({
    name: String,
    dealDescription: String,
    photo: String,
    price_discount: String,
})

const menuItemSchema = new mongoose.Schema({
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
        /*password: {
            type: String,
            required: true,
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            },
            adress: String
        },*/
        description: String,
        //officialEmail: {type: String, required: true},
        hotline: String,
        /*photo: String,
        menu: [menuItemSchema],
        specialDeals: [dealSchema],*/
    }
);

restaurantSchema.index({ location: '2dsphere'});


export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
