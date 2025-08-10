import { searchServices } from "../controllers/searchServices.controllers.js";

import { Router } from "express";

const searchRouter=Router();

searchRouter.route("/search").get(searchServices);

export default searchRouter;