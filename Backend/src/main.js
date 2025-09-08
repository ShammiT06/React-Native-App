import express from "express"
import "dotenv/config"
import cors from "cors"
import job from "./lib/cronJobs.js"



import authRoutes from "./routes/authRoutes.js"
import connectDB from "./lib/Db.js"
import bookRouter from "./routes/bookRoutes.js"
const port = process.env.PORT || 5000




const app = express()
app.use(express.json())
app.use(cors())
job.start()
app.use("/api/auth", authRoutes)
app.use("/api/book", bookRouter)


app.listen(port, () => {
    console.log(`Server Started at ${port}`)
    connectDB()
})