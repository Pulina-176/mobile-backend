import express from 'express';
import { Restaurant } from '../models/restaurantModel.js';

const router = express.Router();

//Save a new Restaurant
router.post('/',async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.hotline ||
            !request.body.description 
        ) {
            return response.status(400).send({
                message: 'Send all the required fields',
            });
        }
        const newRestaurant = {
            title: request.body.title,
            hotline: request.body.hotline,
            description: request.body.description, 
        };

        const restaurant = await Restaurant.create(newRestaurant);
        return response.status(201).send(restaurant);
    } catch (error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }

});

// Route to get all the restaurants
router.get('/', async (rrequest, response) => {
    try {
        const restaurants = await Restaurant.find({});
        return response.status(200).json({
            count: restaurants.length,
            data: restaurants
        });

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// get restaurants by title
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const restaurant = await Restaurant.findById(id);
        return response.status(200).json(restaurant);

    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

router.put('/:id', async(request,response) => {
    try{
        if (
            !request.body.title ||
            !request.body.hotline ||
            !request.body.description 
        ) {
            return response.status(400).send({
                message: 'Send all the required fields',
            });
        }

        const { id } = request.params;
        const result = await Restaurant.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({ message: 'Restaurant not found'});
        }

        return response.status(200).send({message:'Restaurant updated successfully'})
    } catch(error){
        console.log(error.message);
        response.status(500).send( {message: error.message})
    }
});

//Delete
router.delete('/:id',async(request,response)=> {
    try{
        const { id } = request.params;
        const result = await Restaurant.findByIdAndDelete(id);

        if(!result){
            return response.status(400).json({ message: 'Restaurant not found '});
        }

        return response.status(200).send({message: ' Book deleted successfully'});
    } catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

export default router;