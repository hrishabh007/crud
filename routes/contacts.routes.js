import express from 'express';
const router = express.Router();
import Contact from "../models/contacts.model.js";

router.get('/', async (req, res) => {
    const contacts = await Contact.find()
    res.render('home', {contacts: contacts});


});

router.get('/show-contact/:id', async (req, res) => {
    const contact = await Contact.findOne({_id: req.params.id});
    // res.json(contact);
    res.render('show-contact', {contact: contact});
});

router.get('/add-contact', (req, res) => {

    res.render('add-contact');
});

router.post('/add-contact', async (req, res) => {
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
});

// EDIT (show form)
router.get('/update-contact/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send('Contact not found');
    res.render('update-contact', {contact});
});

// EDIT (submit form)
router.post('/update-contact/:id', async (req, res) => {
    const {first_name, last_name, email, phone, address} = req.body;
    await Contact.findByIdAndUpdate(req.params.id, {
        first_name,
        last_name,
        email,
        phone,
        address
    }, {runValidators: true});
    //  await Contact.findByIdAndUpdate(req.params.id, req.body, {runValidators: true});
    res.redirect('/');
});

router.get('/delete-contact/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

export default router; // ✅ export a Rout