const express = require('express')
const router = express.Router()
const { getSettings, updateHeroImage } = require('../controllers/Setting')

router.get('/', getSettings)
router.post('/hero-image', updateHeroImage)

module.exports = router
