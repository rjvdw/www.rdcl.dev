'use strict'

exports.key = 'bosuil'
exports.name = 'Poppodium de Bosuil'
exports.fetch = async (req, res) => {
  res.status(200).json({ agenda: [] })
}
