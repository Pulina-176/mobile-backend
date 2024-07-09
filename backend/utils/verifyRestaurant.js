import jwt from "jsonwebtoken";


export const verifyRestaurant = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, "You are not authenticated"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, restaurant) => {
        if (err) return next(errorHandler(403, "Token is not valid"));
        req.restaurant = restaurant;
        next();
    });
}
