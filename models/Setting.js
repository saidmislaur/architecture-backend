const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
  heroImage: { type: String, default: '' }
})

module.exports = mongoose.model('Setting', settingSchema)
