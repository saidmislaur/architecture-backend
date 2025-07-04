const Project = require('../models/Project')

exports.getProjects = async (req, res) => {
  const projects = await Project.find()
  res.json(projects)
}

exports.addProject = async (req, res) => {
  try {
    const { title, description } = req.body
    const images = req.files.map(file => `/uploads/${file.filename}`)

    const project = new Project({ title, description, images })
    await project.save()

    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при добавлении проекта' })
  }
}

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Удалено' })
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении' })
  }
}
