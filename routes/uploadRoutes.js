const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const router = express.Router()

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads")
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

router.post("/single", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Файл не загружен" })
  res.json({ imageUrl: `/uploads/${req.file.filename}` })
})

router.post("/multiple", upload.array("images", 10), (req, res) => {
  if (!req.files.length) return res.status(400).json({ message: "Файлы не загружены" })
  const imageUrls = req.files.map((file) => `/uploads/${file.filename}`)
  res.json({ imageUrls })
})

module.exports = router
