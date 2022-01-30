'use strict'

exports.auth = () => async (req, res, next) => {
  const user = req.context?.clientContext?.user

  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).json({ reason: 'not authenticated' })
  }
}
