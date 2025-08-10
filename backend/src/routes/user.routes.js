import {Router} from "express"
import { loginUser,logoutUser,registerUser,refreshAccessToken,changeCurrentPassword, deleteUserById, getUserById } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"
import { isAdmin } from "../middlewares/isAdmin.middlewares.js"

const userRouter=Router()


userRouter.route("/register").post(registerUser)


userRouter.route("/login").post(loginUser)

userRouter.route("/logout").get(verifyJWT,logoutUser)

userRouter.route("/refresh-token").post(refreshAccessToken)

userRouter.route("/change-password").put(verifyJWT,changeCurrentPassword)

//Admin only route
userRouter.route("/admin/user/:id").put(isAdmin,verifyJWT,deleteUserById)

userRouter.route("/admin/user/:id").get(isAdmin,verifyJWT,getUserById)



export default userRouter;

