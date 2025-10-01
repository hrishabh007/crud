import mongoose from "mongoose";

const contactsSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String,
});

const Contact = mongoose.model("Contact", contactsSchema);



export default Contact; // ✅ default