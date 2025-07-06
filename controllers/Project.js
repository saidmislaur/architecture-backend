const Project = require('../models/Project')

exports.getProjects = async (req, res) => {
  const projects = await Project.find()
  res.json(projects)
}

exports.getProjectById = async(req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project)
}

exports.createProject = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    let images = [];
    if (req.files && req.files.length) {
      images = req.files.map((file) => file.path);
    } else if (image) {
      images = [image];
    }

    const project = await Project.create({
      title,
      description,
      images,
    });

    res.status(201).json(project);
  } catch (err) {
    console.error('Ошибка при создании проекта:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};


exports.updateProject = async(req, res) => {
  const update = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json(update)
}

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Удалено' })
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении' })
  }
}
