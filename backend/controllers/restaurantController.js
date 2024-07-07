import Restaurant from "../models/restaurantModel.js";
import bcryptjs from "bcryptjs";

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