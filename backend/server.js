const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")

// Importar rutas
const authRoutes = require("./routes/auth")
const categoriaRoutes = require("./routes/categoria.routes")
const equipoRoutes = require("./routes/equipo.routes")
const modeloRoutes = require("./routes/modelo.routes")
const ubicacionRoutes = require("./routes/ubicacion.routes")
const mantenimientoRoutes = require("./routes/mantenimiento.routes")
const prestamoEquipoRoutes = require("./routes/prestamo_equipo.routes")
const hojaVidaEquipoRoutes = require("./routes/hoja_vida_equipo.routes")
const usuarioRoutes = require("./routes/usuario.routes")
const auditoriaRoutes = require("./routes/auditoria.routes")
const estadoEquipoRoutes = require("./routes/estado_equipo.routes")
const historialRoutes = require("./routes/historial.routes")
const perfilRoutes = require("./routes/perfil.routes")

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")))

// Rutas API
app.use("/api/login", authRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/categoria", categoriaRoutes)
app.use("/api/equipo", equipoRoutes)
app.use("/api/modelo", modeloRoutes)
app.use("/api/ubicacion", ubicacionRoutes)
app.use("/api/mantenimiento", mantenimientoRoutes)
app.use("/api/prestamo_equipo", prestamoEquipoRoutes)
app.use("/api/hoja_vida_equipo", hojaVidaEquipoRoutes)
app.use("/api/usuario", usuarioRoutes)
app.use("/api/auditoria", auditoriaRoutes)
app.use("/api/estado_equipo", estadoEquipoRoutes)
app.use("/api/historial", historialRoutes)
app.use("/api/perfil", perfilRoutes)

// Ruta para verificar que el servidor está funcionando
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando correctamente" })
})

// Manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

module.exports = app
