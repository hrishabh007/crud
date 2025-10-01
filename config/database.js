import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/contact-crud");
        console.log("Mongo DB Connected!");
    } catch (err) {
        console.error("Mongo connection error:", err);
        process.exit(1);
    }
};

export default connectDB;