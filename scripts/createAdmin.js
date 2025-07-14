// scripts/createAdmin.js
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Admin = require('./models/Admin') // путь к модели

mongoose.connect(process.env.MONGO_URI)

async function createAdmin() {
  const password = 'admin123' // задай свой пароль
  const passwordHash = await bcrypt.hash(password, 10)

  const existing = await Admin.findOne()
  if (existing) {
    console.log('Admin already exists')
    return
  }

  const admin = new Admin({ passwordHash })
  await admin.save()
  console.log('Admin created')
  mongoose.disconnect()
}

createAdmin()
