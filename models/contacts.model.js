import mongoose from "mongoose";
import pagination from "mongoose-paginate-v2";

const contactsSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String,
});
contactsSchema.plugin(pagination);
const Contact = mongoose.model("Contact", contactsSchema);


export default Contact; // ✅ default