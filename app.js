const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path');

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Роуты
const projectRoutes = require('./routes/index.js')
const uploadRoutes = require('./routes/uploadRoutes.js')
const contactRoutes = require('./routes/contactRoutes.js');
const authLogin = require('./routes/auth.js')
app.use("/api/projects", projectRoutes)
app.use("/api/upload", uploadRoutes)
app.use('/api/contact', contactRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/hero', require('./routes/heroRoutes'))
app.use('/api/settings', require('./routes/settingRoutes'))
app.use('/api', authLogin)


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error', err))

module.exports = app