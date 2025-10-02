import Contact from "../models/contacts.model.js";
import mongoose from "mongoose";

export const getContacts = async (req, res) => {
    const contacts = await Contact.find()
    res.render('home', {contacts: contacts});
}

// GET /contacts/:id - show single

export const addContactPage = (req, res) => {

    res.render('add-contact');
}
export const addContact = async (req, res) => {
    //First way

    // const contact = await Contact.insertOne({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     address: req.body.address,
    // })

    //Second Way
    await Contact.create(req.body);
    res.redirect('/');
}
// GET /contacts/:id - show single
export const showContact = async (req, res, next) => {
    try {
        const { id } = req.params;

        // 400: invalid ObjectId
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).render("400", { message: "Invalid contact id" });
        }

        const contact = await Contact.findById(id).lean();

        // 404: not found
        if (!contact) {
            return res.status(404).render("404", { message: "Contact not found" });
        }

        return res.render("show-contact", { contact });
    } catch (err) {
        return next(err); // your global 500 handler will render 500.ejs
    }
};

// GET /update-contact/:id - edit form
export const getContact = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).render("400", { message: "Invalid contact id" });
        }

        const contact = await Contact.findById(id).lean();
        if (!contact) {
            return res.status(404).render("404", { message: "Contact not found" });
        }

        return res.render("update-contact", { contact });
    } catch (err) {
        return next(err);
    }
};

// POST /update-contact/:id - submit update
export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).render("400", { message: "Invalid contact id" });
        }

        // If you want to validate existence before update:
        const updated = await Contact.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true, // optional: get updated doc back
            lean: true,
        });

        if (!updated) {
            return res.status(404).render("404", { message: "Contact not found" });
        }

        return res.redirect("/");
    } catch (err) {
        return next(err);
    }
};





export const deleteContact = async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
}