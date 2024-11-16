import express from 'express';
import {test} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';
import { updateUser, deleteUser, addCurrentLocation, showNearestRestaurant } from '../controllers/userController.js';

const router = express.Router();

router.get('/', test)
router.post("/update/:id",verifyToken, updateUser)
router.delete("/delete/:id",verifyToken, deleteUser)
router.post("/:id/current-location",verifyToken,addCurrentLocation)
router.get("/:id/nearest-restaurant",verifyToken,showNearestRestaurant)
router.get("/:id/nearest-restaurant-guest",showNearestRestaurant)

export default router;