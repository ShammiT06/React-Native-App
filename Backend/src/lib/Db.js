import mongoose from "mongoose"


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database has been connected")
    }
    catch (error) {
        console.error("Error in Connecting to Database", error)
        process.exit(1)
    }
}

export default connectDB