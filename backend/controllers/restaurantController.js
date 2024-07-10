import Restaurant,{menuItem} from "../models/restaurantModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const signuprestaurant = async (req, res) => {
    const { title, officialEmail, password } = req.body;
  
    try {
      // Check if username or email already exists
      const existingRestaurant = await Restaurant.findOne({officialEmail});
  
      if (existingRestaurant) {
      return res.status(400).json({ message: 'email already exists' });
      }
  
      // Hash the password
      const hashedPassword = bcryptjs.hashSync(password, 10);
  
      // Create a new user
      const newRestaurant = new Restaurant({ title, officialEmail, password: hashedPassword });
      await newRestaurant.save();
  
      // Send success response
      res.status(200).json({ message: 'Restaurant created successfully' });
    } catch (error) {
      // Handle server errors
      res.status(500).json({ message: error.message });
    }
  };

  export const signinrestaurant = async (req, res) => {
    const { officialEmail, password } = req.body;
  
    try {
      const validUser = await Restaurant.findOne({officialEmail});
      if (!validUser) return res.status(404).json({ message: 'Restaurant not found' });
  
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = validUser._doc; 
      const expiryDate = new Date(Date.now()+ 3600000);
      res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const updateRestaurant = async (req, res, next) => {
    if (req.restaurant.id !== req.params.id) {
      return next(errorHandler(401, "You can update only your account!"));
    } 

    try {
      if(req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }

      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            about: req.body.about,
            officialEmail: req.body.officialEmail,
            hotline: req.body.hotline,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
            coverPhoto: req.body.coverPhoto,
            address: req.body.address,
          }
        },
        { new: true } //to see the updated data
      );

      const { password, ...rest } = updatedRestaurant._doc;
      res.status(200).json(rest);
    }

    catch (error) {
      next(error);
    }
  };
    
  export const showProfile = async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      const { password, ...rest } = restaurant._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const addMenu = async (req, res, next) => {
    const restaurantId = req.params.id;
    try {
      const newMenu = {
        category: req.body.category,
        itemName: req.body.itemName,
        description: req.body.description,
        photo: req.body.photo,
        price: req.body.price
      };

      const restaurant = await Restaurant.findById(restaurantId);
      if(!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
      restaurant.menu.push(newMenu);
      await restaurant.save();
      return res.status(201).send(restaurant);
    } catch (error) {
      next(error);
    }
  };
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