import express from "express";
import { signIn, signUp } from "../controllers/authController.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signUp);
//SIGN IN
router.post("/signin", signIn);
//GOOGLE AUTH
// router.post("/google", googleAuth);

export default router;
