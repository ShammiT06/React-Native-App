import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }


}, { timestamps: true })


const Books = mongoose.model("Books",bookSchema)

export default Books