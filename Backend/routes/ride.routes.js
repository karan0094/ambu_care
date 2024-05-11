import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { rideRequest } from "../controllers/ride.controller.js";
const router =Router();
//verifyJwt include it letter onwards
router.route('/service').post(rideRequest)


export default router