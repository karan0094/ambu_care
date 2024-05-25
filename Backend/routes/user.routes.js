import { Router } from "express";
import { loggedOut, loginUser,registerUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { registerCar } from "../controllers/Usercar.controller.js";
import { reportaccidents } from "../controllers/userreport.controller.js";

const router=Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJwt ,loggedOut)
router.route("/carregister").post(verifyJwt,registerCar)
router.route("/reportaccidents").post(verifyJwt,reportaccidents)



export default router
