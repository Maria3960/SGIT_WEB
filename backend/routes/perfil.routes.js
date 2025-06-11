const express = require("express")
const router = express.Router()
const db = require("../database/db")
const verifyToken = require("../middleware/authMiddleware")

// Obtener perfil del usuario autenticado
router.get("/", verifyToken, async (req, res) => {
  try {
    console.log("Usuario del token:", req.user)
    const userId = req.user.id_usuario

    const [rows] = await db.execute(
      `SELECT u.Id_Usuario, u.Usuario, u.Nombre_Usuario_1, u.Nombre_Usuario_2, 
              u.Apellidos_Usuario_1, u.Apellidos_Usuario_2, u.Correo_Usuario, 
              u.Telefono_1_Usuario, u.Id_Rol
       FROM usuario u
       WHERE u.Id_Usuario = ?`,
      [userId],
    )

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    const user = rows[0]

    // Función para obtener nombre del rol
    const getRoleName = (idRol) => {
      const roles = {
        1: "Administrador",
        2: "Almacenista",
        3: "Profesor",
        4: "Mantenimiento",
      }
      return roles[idRol] || "Sin rol"
    }

    const perfilData = {
      id: user.Id_Usuario,
      Usuario: user.Usuario,
      nombre: user.Nombre_Usuario_1,
      nombre2: user.Nombre_Usuario_2,
      apellido: user.Apellidos_Usuario_1,
      apellido2: user.Apellidos_Usuario_2,
      email: user.Correo_Usuario,
      telefono: user.Telefono_1_Usuario,
      Id_rol: user.Id_Rol,
      Nombre_rol: getRoleName(user.Id_Rol),
      cargo: getRoleName(user.Id_Rol),
    }

    console.log("Enviando perfil:", perfilData)
    res.json(perfilData)
  } catch (err) {
    console.error("Error en /perfil:", err)
    res.status(500).json({ message: "Error al obtener perfil", error: err.message })
  }
})

module.exports = router
