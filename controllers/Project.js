const Project = require('../models/Project')

exports.getProjects = async (req, res) => {
  try {
    const { category, search, sortBy = "createdAt", sortOrder = "desc" } = req.query

    const query = {}

    // Фильтр по категории
    if (category && category !== "all") {
      query.category = category
    }

    // Поиск
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
        { "location.city": { $regex: search, $options: "i" } },
        { "keyFeatures.title": { $regex: search, $options: "i" } },
      ]
    }

    const projects = await Project.find(query).sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })

    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getProjectById = async(req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ message: "Проект не найден" })
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body)
    const savedProject = await project.save()
    res.status(201).json(savedProject)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};


exports.updateProject = async(req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!project) {
      return res.status(404).json({ message: "Проект не найден" })
    }
    res.json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) {
      return res.status(404).json({ message: "Проект не найден" })
    }
    res.json({ message: "Проект удален" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments()
    const projectsByCategory = await Project.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }])
    res.json({ totalProjects, projectsByCategory })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
