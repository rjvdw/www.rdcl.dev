exports.key = 'patronaat'
exports.name = 'Patronaat'
exports.fetch = async (req, res) => {
  res.status(200).json({ agenda: [] })
}
