// authController.js
import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Send success response
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(401).json({ message: 'User not found' });

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return res.status(401).json({ message: 'Wrong credentials' });

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc; 

    res.cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest); 
  } catch (error) {
    next(error);
  }
};