import express from 'express';

const router = express.Router();
import Contact from "../models/contacts.model.js";
import {
    addContact, addContactPage,
    deleteContact,
    getContact,
    getContacts,
    showContact,
    updateContact
} from "../controller/contactsController.js";

router.get('/', getContacts);

router.get('/show-contact/:id', showContact);

router.get('/add-contact', addContactPage);

router.post('/add-contact', addContact);

// EDIT (show form)
router.get('/update-contact/:id', getContact);

// EDIT (submit form)
router.post('/update-contact/:id', updateContact);

router.get('/delete-contact/:id', deleteContact);

export default router; // ✅ export a Rout