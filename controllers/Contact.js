const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')


exports.getContact = async (req, res) => {
  const contact = await Contact.findOne();
  if (!contact) {
    return res.status(404).json({ message: 'Контакт не найден' });
  }
  res.json(contact);
};


exports.postContact = async(req, res) => {
    const {email, phone, address} = req.body;

    let contact = await Contact.findOne();
    if(contact) {
        contact.email = email;
        contact.phone = phone;
        contact.address = address;
        await contact.save();
    } else {
        contact = await Contact.create({ email, phone, address })
    }

    res.json({message: "Данные обновлены", contact})
}