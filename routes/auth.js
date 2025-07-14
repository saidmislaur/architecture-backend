const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../models/Admin')

const  SECRET_KEY = process.env.JWT_SECRET || 'admin123'

router.post('/login', async (req, res) => {
    const { password } = req.body
    const admin = await Admin.findOne()

    if(!admin) return res.status(404).json({message: 'Admin не найден'})

    const isMatch = await bcrypt.compare(password, admin.passwordHash)
    if(!isMatch) return res.status(401).json({ message: 'Invalid password' })

    const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: '7d' })
    res.json({ token })
})

router.post('/change-password', async (req, res) => {
  const { newPassword } = req.body
  const hashed = await bcrypt.hash(newPassword, 10)
  const admin = await Admin.findOne()
  admin.passwordHash = hashed
  await admin.save()
  res.json({ message: 'Password changed' })
})

module.exports = router