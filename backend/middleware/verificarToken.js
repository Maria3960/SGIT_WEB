const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET || 'SgIt.2.0.2.5.FcA'

module.exports = function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ mensaje: 'Token no proporcionado' })

  const token = authHeader.split(' ')[1]
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err || !decoded?.id_usuario) {
      return res.status(403).json({ mensaje: 'Token inválido o incompleto' })
    }

    console.log("Payload decodificado:", decoded) // para depurar
    req.usuario = decoded
    next()
  })
}
