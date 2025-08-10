import { ApiError } from "../utils/ApiError.js";

export const isAdmin=(req,res,next)=>{
    if(!req.user || !req.user.isAdmin){
        throw new ApiError(403,"Access denied. Admins only")
    }

    next();
}