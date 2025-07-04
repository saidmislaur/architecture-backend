const express = require('express')
const router = express.Router()
const { getProjects, addProject, deleteProject } = require('../controllers/Project')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

router.get('/', getProjects)
router.post('/', upload.array('images'), addProject)
router.delete('/:id', deleteProject)

module.exports = router
