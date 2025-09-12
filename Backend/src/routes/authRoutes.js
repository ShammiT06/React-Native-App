import express from 'express'
import User from '../models/User.js'
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'


const router = express.Router()




const generateToken = (user_id)=>{
  return  jwt.sign({user_id},process.env.JWT_TOKEN,{expiresIn:"20d"})

}

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPassword = await user.comparePassword(String(password));
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        profileImage: user.profileImage,
        userEmail: user.email
      }
    });

  } catch (error) {
    console.error("Something Went Wrong:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



router.post("/register", async (req,res)=>{
    try {
        const {email,username,password}=req.body
        if(!email || !username || !password)
        {
            return res.status(400).json({message:"All Fields are Required"})
        }
        if(username.length < 3)
        {
            return res.status(400).json({message:"Username should be at least 3 characters "})
        }

      if(password.length < 6)
      {
        return res.status(400).json({message:"Password must be atlest 5"})
      }

        const existingUser = await User.findOne({$or:[{email:email},{username:username}]})

        if(existingUser)
        {
            return res.status(400).json({message:"User Already Exist"})
        }


        const profileImage= `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`


        const user = new User({
            username,
            email,
            password,
            profileImage:profileImage
        })

        await user.save()


        const token = generateToken(user._id)
        res.status(200).json({
            token,
            user:{
                id:user._id,
                email:email,
                username:username,
                profileImage:profileImage
            }
        })

        
    } catch (error) {
        console.error("Something Went Wrong",error)
        res.status(500).json({message:"Internal Server Error"})
        
    }

})



export default router