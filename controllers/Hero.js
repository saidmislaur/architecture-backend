const fs = require('fs')
const path = require('path')

exports.uploadHeroImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Файл не загружен' })
  }

  const imagePath = `/uploads/${req.file.filename}`
  res.json({ imageUrl: imagePath })
}
