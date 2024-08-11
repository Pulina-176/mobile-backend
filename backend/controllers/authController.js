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
    if (!validUser) return next(errorHandler(404, 'User not found'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, 'Invalid credentials'));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc; 
    const expiryDate = new Date(Date.now()+ 3600000);
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate, sameSite: 'none', secure: true })
      .status(200)
      .json(rest); 
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next)=> {
  try {
    const user =  await User.findOne({email: req.body.email})
    if(user){
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc; 
      const expiryDate = new Date(Date.now()+ 3600000);

      res.cookie('access_token', token, { httpOnly: true, expires: expiryDate, sameSite: 'none', secure: true })
        .status(200)
        .json(rest); 
    }else{
      const genetatedPassword = Math.random().toString(36).
      slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(genetatedPassword,10);
      const newUser = new User({username: req.body.name.split(' ').join('').toLowerCase()+Math.random().toString(36).slice(-8), email: req.body.email, password: hashedPassword, profilePicture: req.body.photo});
      await newUser.save();
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc; 
      const expiryDate = new Date(Date.now()+ 3600000);

      res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
    }
    
  } catch (error) {
    next(error)
  }
};

export const signout =  (req, res) => {
  res.clearCookie('access_token').status(200).json('User has been signed out');
};