import { Router } from "express";
import { driverRegister, logOut, loginDriver,updateLocation } from "../controllers/driver.controller.js";
import { verifyJwtDriver } from "../middlewares/auth.middleware.js";

const router=Router();
router.route("/register").post(driverRegister)
router.route("/login").post(loginDriver)

//logout route
router.route("/logout").post(verifyJwtDriver, logOut)

//geoLocation of driver Route
// router.route("/openforbookings").patch(verifyJwtDriver,updateLocation)


export default router