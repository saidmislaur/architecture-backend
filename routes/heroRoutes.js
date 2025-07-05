const express = require('express')
const router = express.Router()
const multer = require('multer')
const { uploadHeroImage } = require('../controllers/Hero')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})

const upload = multer({ storage })

router.post('/upload-hero', upload.single('image'), uploadHeroImage)

module.exports = router
