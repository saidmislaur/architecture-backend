const Setting = require('../models/Setting')

exports.getSettings = async (req, res) => {
  let setting = await Setting.findOne()
  if (!setting) setting = await Setting.create({})
  res.json(setting)
}

exports.updateHeroImage = async (req, res) => {
  const { imageUrl } = req.body
  let setting = await Setting.findOne()
  if (!setting) setting = await Setting.create({ heroImage: imageUrl })
  else setting.heroImage = imageUrl

  await setting.save()
  res.json({ message: 'Фон обновлен', heroImage: setting.heroImage })
}
