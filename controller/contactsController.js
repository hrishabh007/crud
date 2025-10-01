import Contact from "../models/contacts.model.js";


export const getContacts = async (req, res) => {
    const contacts = await Contact.find()
    res.render('home', {contacts: contacts});
}

export const showContact = async (req, res) => {
    const contact = await Contact.findOne({_id: req.params.id});
    // res.json(contact);
    res.render('show-contact', {contact: contact});
}
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


export const getContact = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send('Contact not found');
    res.render('update-contact', {contact});
}

export const updateContact = async (req, res) => {
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
}

export const deleteContact = async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect('/');
}