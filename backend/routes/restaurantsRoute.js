import express from 'express';
//import { Restaurant } from '../models/restaurantModel.js';
import { signuprestaurant, signinrestaurant , updateRestaurant, showProfile, addMenu, addCategory, addspecialdeals, updateLocation, viewProfile, editMenu, showMenu, deleteMenu, deleteOffer, deleteRestaurant} from '../controllers/restaurantController.js';
import { verifyRestaurant } from '../utils/verifyRestaurant.js';

const router = express.Router();

router.post('/signup', signuprestaurant);
router.post('/signin', signinrestaurant);
router.post('/update/:id',verifyRestaurant, updateRestaurant);
router.get('/myprofile/:id',verifyRestaurant, showProfile);
router.get('/:id', viewProfile);
router.post('/:id/menu',verifyRestaurant, addMenu);
router.post('/:id/menu/edit/:menuid',verifyRestaurant, editMenu);
router.get('/:id/menu/show/:menuid',verifyRestaurant, showMenu);
router.delete('/:id/menu/delete/:menuid',verifyRestaurant, deleteMenu);
router.delete('/:id/offers/delete/:offerid',verifyRestaurant, deleteOffer);
router.delete('/delete/:id',verifyRestaurant, deleteRestaurant);
router.post('/:id/specialdeals',verifyRestaurant, addspecialdeals);
router.post('/:id/category',verifyRestaurant, addCategory);
router.post('/:id/update-location',verifyRestaurant, updateLocation);



//Save a new Restaurant
// router.post('/',async (request, response) => {
//     try{
//         // if(
//         //     !request.body.title ||
//         //     !request.body.hotline ||
//         //     !request.body.description 
//         // ) {
//         //     return response.status(400).send({
//         //         message: 'Send all the required fields',
//         //     });
//         // }
//         // const newRestaurant = {
//         //     title: request.body.title,
//         //     hotline: request.body.hotline,
//         //     description: request.body.description, 
//         // };

//         // const restaurant = await Restaurant.create(newRestaurant);
//         // return response.status(201).send(restaurant);
//     } catch (error){
//         console.log(error.message);
//         response.status(500).send({ message: error.message});
//     }

// });

// Route to get all the restaurants
// router.get('/', async (rrequest, response) => {
//     try {
//         const restaurants = await Restaurant.find({});
//         return response.status(200).json({
//             count: restaurants.length,
//             data: restaurants
//         });

//     } catch(error){
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });

// // get restaurants by title
// router.get('/:id', async (request, response) => {
//     try {

//         const { id } = request.params;
//         const restaurant = await Restaurant.findById(id);
//         return response.status(200).json(restaurant);

//     } catch(error){
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });

// router.put('/:id', async(request,response) => {
//     try{
//         if (
//             !request.body.title ||
//             !request.body.hotline ||
//             !request.body.description 
//         ) {
//             return response.status(400).send({
//                 message: 'Send all the required fields',
//             });
//         }

//         const { id } = request.params;
//         const result = await Restaurant.findByIdAndUpdate(id, request.body);
//         if(!result){
//             return response.status(404).json({ message: 'Restaurant not found'});
//         }

//         return response.status(200).send({message:'Restaurant updated successfully'})
//     } catch(error){
//         console.log(error.message);
//         response.status(500).send( {message: error.message})
//     }
// });

// //Delete
// router.delete('/:id',async(request,response)=> {
//     try{
//         const { id } = request.params;
//         const result = await Restaurant.findByIdAndDelete(id);

//         if(!result){
//             return response.status(400).json({ message: 'Restaurant not found '});
//         }

//         return response.status(200).send({message: ' Book deleted successfully'});
//     } catch(error){
//         console.log(error.message);
//         response.status(500).send({ message: error.message});
//     }
// });

export default router;