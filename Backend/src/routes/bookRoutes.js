import express from "express"
import cloudinary from "../lib/Cloudinary.js"
import Book from "../models/Book.js"
import protectedRoute from "./middlewares/auth.middleware.js"

const bookRouter = express.Router()


bookRouter.post("/", async function (req, res) {
    try {
        const { title, rating, image, caption } = req.body

        if (!title || !rating || !caption) {
            return res.status(400).json({ message: "Please fill all fields" })
        }

        const imageUpload = await cloudinary.uploader.upload(image)
        const imageURl = imageUpload.secure_url

        const newBook = new Book({
            title: title,
            ratings: rating,
            content: caption,
            images: imageURl
        })

        await newBook.save()


        res.status(200).json({ message: "Book has been created Successfully" })

    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})



bookRouter.get("/", protectedRoute, async function (req, res) {
    try {

        const page = req.query || 1
        const limit = req.query || 5
        const skip = (page - 1) * limit



        const books = await Book.find().sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("user", "username profileImage")


        const total = await Book.countDocuments()

        res.status(200).json({
            books,
            currentPage: page,
            total,
            totalPages: Math.ceil(total / page)
        })



    } catch (error) {
        console.log(Error)
        res.status(500).json({ message: "Internal Server Error" })
    }
})


bookRouter.delete("/:id", protectedRoute, async function (req, res) {
    const book = await Book.findById(req.query.id)
    if (!book) {
        return res.status(400).json({ message: "Book not Found" })
    }

    if (book.user.toString() !== req.user._id.toString()) {
        return res.status(400).json({ message: "Unauthorized User" })
    }

    if (book.images && book.images.includes("cloudinary")) {
        try {
            const Bookdelete = book.images.split("/")
            const deletedbook = Bookdelete.pop()
            const finalbook = deletedbook.split("/")
            console.log(finalbook)

            cloudinary.uploader.destroy(finalbook)

        } catch (error) {
            console.log("Error in Deleting from Cloudinary", error)

        }
    }


    await Book.deleteOne()

    res.status(200).json({ message: "Book has been Deleted Successfully" })
})




bookRouter.get('/user',protectedRoute, async (req,res)=>{

    try {
        const userDetails = Book.find({user:req.user._id}).sort({createdAt:-1})
        res.status(200).json(userDetails)
    } catch (error) {
        console.log("Error in handling Data",error)
        res.status(500).json({message:"Internal Server Error"})
        
    }

})






export default bookRouter