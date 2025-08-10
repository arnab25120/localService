import { ApiError } from "../utils/ApiError.js"

export const authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(req.user?.isAdmin || roles.includes(req.user?.role)){
            return next()
        }
        throw new ApiError(403,"Access denied")
    }
}