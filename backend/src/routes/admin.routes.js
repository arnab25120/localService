import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { isAdmin } from "../middlewares/isAdmin.middlewares.js";
import { getAdminDashboardStats } from "../controllers/admin.controllers.js";

const adminRouter=Router()

adminRouter.route("/dashboard",verifyJWT,isAdmin,getAdminDashboardStats);

export default adminRouter;