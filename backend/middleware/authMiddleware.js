const jwt = require("jsonwebtoken")
const SECRET_KEY = "clave_secreta_super_segura"

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  console.log("Auth header:", authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No hay token válido")
    return res.status(401).json({ message: "No autorizado" })
  }

  const token = authHeader.split(" ")[1]
  console.log("Token extraído:", token)

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    console.log("Token decodificado:", decoded)
    req.user = decoded // contiene id_usuario, rol
    next()
  } catch (err) {
    console.log("Error al verificar token:", err.message)
    res.status(401).json({ message: "Token inválido o expirado" })
  }
}

module.exports = verifyToken
