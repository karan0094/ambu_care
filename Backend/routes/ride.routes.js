import { Router } from "express";
import { verifyJwt, verifyJwtDriver } from "../middlewares/auth.middleware.js";
import { driverRideDetails, rideRequest } from "../controllers/ride.controller.js";
import { userRideDetails } from "../controllers/ride.controller.js";
const router =Router();
//verifyJwt include it letter onwards
router.route('/service').post(rideRequest)
router.route('/dridedetails').get(verifyJwtDriver,driverRideDetails);
router.route("/uridedetails").get(verifyJwt ,userRideDetails)
export default router