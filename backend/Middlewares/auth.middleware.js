import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandler.js";
import {User} from '../Models/user.model.js'

const verifyJWT = asyncHandler(async (req,res,next) => {
    try {
        
        const token = req.cookies.accessToken;

        // Check if token exists
        if(!token){
            res.json({
                "message" : "unauthorized"
            });
            return;
        }

        // Verify the token
        // If the token is invalid or expired, it will throw an error
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")

        if(!user){
            res.json({
                "message" : "invalid access token"
            });
            
            return;
        }

        req.user = user;

        next()

    } catch (error) {
        res.status(401).json({
            "message" : error?.message || "Unauthorized request"   
        })

        return;
    }
})

export default verifyJWT;