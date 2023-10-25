import User from "../models/Users.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables from .env file
dotenv.config();


const sendVerifyMail = async (name, email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
      requireTLS: true,
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });
    const mailOption = {
      from: "jtpjishnu@gmail.com",
      to: email,
      subject: "Verification Code from Book Me Hotel",
      html:
        "<p>Hi " +
        name +
        " This is your otp to verify your Book Me Hotel account the otp is " +
           otp +
        "</p>",
    };
    transporter.sendMail(mailOption, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("email has been send", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

let useremail;
let otp;


// export const register = async (req, res, next) => {
//   try {
//       const userExists = await User.findOne({email:req.body.email})
//       console.log(userExists);
//       if(userExists){
//           res.status(200).send({message:"user already exists",success:false})
//       }
//       const password = req.body.password;
//       const salt = await bcrypt.genSalt(10)
//       const  hashedPassword = await bcrypt.hash(password,salt);
//       req.body.password =hashedPassword;
//       const newuser = new User(req.body);
//       const user =  await newuser.save();
//       if (user) {
//           const randomnumber = Math.floor(Math.random() * 9000) + 1000;
//           otp = randomnumber;
//           console.log(randomnumber);
//           useremail = req.body.email;
//           sendVerifyMail(req.body.name, req.body.email, randomnumber);
//         }
//       res.status(200).send({message:"Enter Mail otp for verification",success:true})

//   } catch (error) {
//       res.status(500).send({message:"Error Creating user",success:false,error})

//   }
// }

export const register = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    console.log(userExists);

    if (userExists) {
      return res.status(200).send({ message: "User already exists", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newuser = new User(req.body);
    const user = await newuser.save();

    if (user) {
      const randomnumber = Math.floor(Math.random() * 9000) + 1000;
      otp = randomnumber;
      console.log(randomnumber);
      useremail = req.body.email;
      sendVerifyMail(req.body.name, req.body.email, randomnumber);
    }

    res.status(200).send({ message: "Enter Mail OTP for verification", success: true });

  } catch (error) {
    res.status(500).send({ message: "erro", success: false, error });
  }
};




export const otpVerify = async (req, res,next) => {
  const postotp = req.body.otp;

  try {
    if (otp == undefined) {
      res
        .status(200)
        .send({ message: "enter the correct otp", success: false });
    } else {
      if (otp == postotp) {
        await User.findOneAndUpdate(
          { email: useremail },
          { $set: { is_verified: true } }
        );
        res.status(200).send({ message: "verified your email", success: true });
      } else {
        res
          .status(200)
          .send({ message: "enter the correct otp", success: false });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error, success: false });
  }
};



export const login= async (req, res,next) => {
    try {
        const user = await User.findOne({email:req.body.email});
        
        const isVerified = user.is_verified;
        const isBlock = user.is_block
        if(!user){
            return res.status(200).send({message:"User doesnot exist",success:false});
        }

        const isMatch  = await bcrypt.compare(req.body.password,user.password); 
        if(!isMatch){
            return res.status(200).send({message:"Password is incorrect",success:false});
        }else{
            if (isVerified && !isBlock){

            
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

            res.status(200).send({message:"Login Successful",success:true,data:token});
        }else{
            res.status(200).send({message:"Please verify your email or Blocked profile",success:false});
        }
    }

    } catch (error) { 
        res.status(500).send({message:"Error loggin in",success:false,error});

    }
}





// export const register = async (req,res,  next)=>{
//   try {
//     const salt =bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password,salt)

//     const newUser = new User({
//         username:req.body.username,
//         email:req.body.email, 
//         password: hash,

//     })

//     await newUser.save()
//     res.status(200).send(" user created")
    
//   } catch (err) {
//     next(err)
    
//   }
// }

// export const login = async (req,res,next)=>{
//     try {
//         const user= await User.findOne({username:req.body.username})
//         if(!user) return next(createError(404,"user not found"))
     
//         const isPasswordCorrect= await bcrypt.compare(req.body.password,user.password)
//         if(!isPasswordCorrect) return next(createError(400,"Wrong password or username"))

//         const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)

//         const {password,isAdmin,...otherDetails} = user._doc;

//       res.cookie("access_token",token,{httpOnly:true,})
//       .status(200)
//       .json({details:{...otherDetails},isAdmin});
//       res.status(200)
       
      
//     } catch (err) {
//       next(err)
      
//     }
//   }

export const resetPassword = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      return res
        .status(200)
        .send({
          message: "enter the correct mail or register first",
          success: false,
        });
    } else {
      const name = "user";
      useremail = req.body.email;
      const randomnumber = Math.floor(Math.random() * 9000) + 1000;
      console.log(randomnumber);
      otp = randomnumber;

      sendVerifyMail(name, req.body.email, randomnumber);
      res
        .status(200)
        .send({ message: "Enter your otp and update password", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};


export const resetOtp = async (req, res) => {
  try {
    if (otp != req.body.otp) {
      return res
        .status(200)
        .send({ message: "enter the correct otp", success: false });
    } else {
      if (req.body.password1 != req.body.password2) {
        return res
          .status(200)
          .send({ message: "check the 2 passwords", success: false });
      }
      const salt = await bcrypt.genSalt(10);
      req.body.password1 = await bcrypt.hash(req.body.password2, salt);
      const updatePassword = await User.findOneAndUpdate(
        { email: useremail },
        { $set: { password: req.body.password1, is_verified: true } }
      );
      res
        .status(200)
        .send({ message: "your password is updated", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export const authorization = async(req,res)=>{

  try {
      const user = await User.findOne({_id:req.body.userId })
      if(!user){
          return res.status(200).send({message:"user does not exist ",success:false})
      }else{
          res.status(200).send({success:true,data:{
              name:user.name,
              email:user.email
          }}) 
      }
       
  } catch (error) {
      return res.status(500).send({message:"Error Getting User indo ",success:false,error})
      
  }

}