exports.key = 'boerderij'
exports.name = 'Cultuurpodium Boerderij'
exports.fetch = async (req, res) => {
  res.status(200).json({ agenda: [] })
}
