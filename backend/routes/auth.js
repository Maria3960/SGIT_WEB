const express = require("express")
const router = express.Router()
const db = require("../database/db")
const jwt = require("jsonwebtoken")
const verifyToken = require("../middleware/authMiddleware")

const SECRET_KEY = "clave_secreta_super_segura"

// === LOGIN ===
router.post("/login", async (req, res) => {
  const { usuario, password, rol } = req.body

  if (!usuario || !password || !rol) {
    return res.status(400).json({ success: false, message: "Faltan datos" })
  }

  try {
    const [rows] = await db.execute("SELECT * FROM usuario WHERE Usuario = ? AND Id_Rol = ? LIMIT 1", [usuario, rol])

    if (rows.length === 0) {
      return res.json({ success: false, message: "Usuario no encontrado" })
    }

    const user = rows[0]

    // Verificar contraseña (en producción usar bcrypt)
    const passwordCorrecta = password === user.Contraseña

    if (!passwordCorrecta) {
      return res.json({ success: false, message: "Contraseña incorrecta" })
    }

    // Crear token con información del usuario
    const token = jwt.sign({ id_usuario: user.Id_Usuario, rol: user.Id_Rol }, SECRET_KEY, { expiresIn: "2h" })

    let redirect = ""
    switch (Number.parseInt(rol)) {
      case 1:
        redirect = "/inicio"
        break
      case 2:
        redirect = "/inicio"
        break
      case 3:
        redirect = "/inicio"
        break
      case 4:
        redirect = "/inicio"
        break
      default:
        redirect = "/"
    }

    res.json({
      success: true,
      token,
      usuario: user.Usuario,
      redirect,
      user: {
        id: user.Id_Usuario,
        usuario: user.Usuario,
        nombre: user.Nombre_Usuario_1,
        apellido: user.Apellidos_Usuario_1,
        rol: user.Id_Rol,
      },
    })
  } catch (err) {
    console.error("Error en /login:", err)
    res.status(500).json({ success: false, message: "Error en el servidor" })
  }
})

// === PERFIL ===
router.get("/perfil", verifyToken, async (req, res) => {
  try {
    // Usar req.user.id_usuario como está definido en el middleware
    const userId = req.user.id_usuario

    const [rows] = await db.execute(
      `
      SELECT u.Id_Usuario, u.Usuario, u.Nombre_Usuario_1, u.Nombre_Usuario_2, 
             u.Apellidos_Usuario_1, u.Apellidos_Usuario_2, u.Correo_Usuario, 
             u.Telefono_1_Usuario, u.Id_Rol, r.Nombre_Rol
      FROM usuario u
      LEFT JOIN rol r ON u.Id_Rol = r.Id_Rol
      WHERE u.Id_Usuario = ?
    `,
      [userId],
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    const user = rows[0]
    res.json({
      id: user.Id_Usuario,
      Usuario: user.Usuario,
      nombre: user.Nombre_Usuario_1,
      nombre2: user.Nombre_Usuario_2,
      apellido: user.Apellidos_Usuario_1,
      apellido2: user.Apellidos_Usuario_2,
      email: user.Correo_Usuario,
      telefono: user.Telefono_1_Usuario,
      Id_rol: user.Id_Rol,
      Nombre_rol: user.Nombre_Rol,
      cargo: getRoleName(user.Id_Rol),
      departamento: "Tecnología",
    })
  } catch (err) {
    console.error("Error en /perfil:", err)
    res.status(500).json({ message: "Error al obtener perfil" })
  }
})

// Función auxiliar para obtener nombre del rol
function getRoleName(idRol) {
  const roles = {
    1: "Administrador",
    2: "Almacenista",
    3: "Docente",
    4: "Técnico",
  }
  return roles[idRol] || "Sin rol"
}

module.exports = router
