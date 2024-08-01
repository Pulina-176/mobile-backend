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

  export const viewProfile = async (req, res, next) => {
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

  export const addCategory = async (req, res, next) => {
    const restaurantId = req.params.id;
    try {
      const newCategory = req.body.category; // Get the category as a string from the request body
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
      restaurant.categoryList.push(newCategory); // Push the new category string to the categoryList array
      await restaurant.save();
      return res.status(201).send(restaurant);
    } catch (error) {
      next(error);
    }
  };

  export const addspecialdeals = async (req, res, next) => {
    const restaurantId = req.params.id;
    try {
      const newSpecialDeals = {
        name: req.body.name,
        dealDescription: req.body.dealDescription,
        photo: req.body.photo,
        price_discount: req.body.price_discount
      };

      const restaurant = await Restaurant.findById(restaurantId);
      if(!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
      restaurant.specialDeals.push(newSpecialDeals);
      await restaurant.save();
      return res.status(201).send(restaurant);
    } catch (error) {
      next(error);
    }
  };

  export const updateLocation = async (req, res, next) => {
    const restaurantId = req.params.id;
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
      const {latitude, longitude} = req.body;
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        {
          $set: {
            location: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
          },
        },
        { new: true }
      ) 
      return res.status(200).send(updatedRestaurant);

    } catch (error) {
      next(error);
    }
  };

  export const editMenu = async (req, res, next) => {
    const restaurantId = req.params.id;
    const menuId = req.params.menuid;
    const updatedMenuItem = req.body;
  
    try {
      // Validate restaurantId and menuId
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }

      const menuItem = restaurant.menu.id(menuId);
      if (!menuItem) {
        return res.status(404).send({ message: 'Menu item not found' });
      }
      menuItem.set(updatedMenuItem);
      await restaurant.save();
      return res.status(200).send(restaurant);
    } catch (error) {
      next(error);
    }
  };

  export const showMenu = async (req, res, next) => {
    const restaurantId = req.params.id;
    const menuId = req.params.menuid;
    try {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
      const menuItem = restaurant.menu.id(menuId);
      if (!menuItem) {
        return res.status(404).send({ message: 'Menu item not found' });
      }
      return res.status(200).send(menuItem);
    } catch (error) {
      next(error);
    }
  };

  export const deleteMenu = async (req, res, next) => {
    const restaurantId = req.params.id;
    const menuId = req.params.menuid;
  
    try {
      // Find the restaurant by ID
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
  
      // Check if menu array exists and is an array
      if (!Array.isArray(restaurant.menu)) {
        return res.status(400).send({ message: 'Menu is not an array' });
      }
  
      // Remove the menu item from the restaurant's menu
      const menuItemIndex = restaurant.menu.findIndex(item => item._id.toString() === menuId);
      if (menuItemIndex === -1) {
        return res.status(404).send({ message: 'Menu item not found' });
      }
  
      // Remove the menu item by index
      restaurant.menu.splice(menuItemIndex, 1);
  
      // Save the updated restaurant document
      const updatedRestaurant = await restaurant.save();
  
      // Return the updated restaurant
      return res.status(200).send(updatedRestaurant);
    } catch (error) {
      // Pass errors to the error handling middleware
      next(error);
    }
  };

  export const deleteOffer = async (req, res, next) => {
    const restaurantId = req.params.id;
    const offerId = req.params.offerid;
  
    try {
      // Find the restaurant by ID
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).send({ message: 'Restaurant not found' });
      }
  
      // Check if offers array exists and is an array
      if (!Array.isArray(restaurant.specialDeals)) {
        return res.status(400).send({ message: 'specialDeals is not an array' });
      }
  
      // Remove the offer item from the restaurant's offers
      const offerItemIndex = restaurant.specialDeals.findIndex(item => item._id.toString() === offerId);
      if (offerItemIndex === -1) {
        return res.status(404).send({ message: 'Offer item not found' });
      } 
      restaurant.specialDeals.splice(offerItemIndex, 1);  

      // Save the updated restaurant document 
      const updatedRestaurant = await restaurant.save();
  
      // Return the updated restaurant
      return res.status(200).send(updatedRestaurant);
    } catch (error) {
      // Pass errors to the error handling middleware
      next(error);
    }
  };


  export const deleteRestaurant = async (req, res, next) => {
    if (req.restaurant.id !== req.params.id) {
      return next(errorHandler(401, "You can delete only your account!"));
    }
    try{
      await Restaurant.findByIdAndDelete(req.params.id);
      res.status(200).json("Restaurant has been deleted");

    }catch (error){
      next(error);

    }

  };

  export const signoutrestaurant = async (req, res, next) => {
    res.clearCookie("access_token").status(200).json("Sign out successful");
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