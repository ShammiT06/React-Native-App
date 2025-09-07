import jwt from "jsonwebtoken"
import User from "../../models/User.js"

const protectedRoute = async (req,res,next)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ","")

    const decoded=jwt.verify(token,process.env.JWT_TOKEN)

    const user = await User.findById(decoded.userId).select("-password")

    if (!user)
    {
        res.status(400).json({message:"Not valid token"})
    }

    req.user=user
    next()
        
    } catch (error) {
        res.status(400).json({message:"Unauthorized User"})
        
    }

    

}

export default protectedRoute