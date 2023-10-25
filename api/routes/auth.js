import express from "express";
import { authorization, login, otpVerify, register, resetOtp, resetPassword, } from "../controllers/auth.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router=express.Router();

 router.post("/register",register)
 router.post("/login",login);
 router.post("/otp",otpVerify);
 router.post("/forgetPassword",resetPassword)
 router.post("/userReset",resetOtp)
 router.post('/get-user-info-by-id',authMiddleware,authorization)


export default router