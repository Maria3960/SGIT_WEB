// Configuración base de la API
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = localStorage.getItem("authToken")
  }

  // Método base para hacer peticiones
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Manejar diferentes formatos de respuesta de la API
      if (data.success && data.data) {
        return data.data
      } else if (data.data) {
        return data.data
      } else if (Array.isArray(data)) {
        return data
      } else {
        return data
      }
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Métodos para equipos
  async getEquipos() {
    const result = await this.request("/equipo")
    return Array.isArray(result) ? result : []
  }

  async getEquipo(id) {
    return this.request(`/equipo/${id}`)
  }

  async createEquipo(equipoData) {
    return this.request("/equipo", {
      method: "POST",
      body: JSON.stringify(equipoData),
    })
  }

  async updateEquipo(id, equipoData) {
    return this.request(`/equipo/${id}`, {
      method: "PUT",
      body: JSON.stringify(equipoData),
    })
  }

  async deleteEquipo(id) {
    return this.request(`/equipo/${id}`, {
      method: "DELETE",
    })
  }

  // Métodos para categorías
  async getCategorias() {
    const result = await this.request("/categoria")
    return Array.isArray(result) ? result : []
  }

  async createCategoria(categoriaData) {
    return this.request("/categoria", {
      method: "POST",
      body: JSON.stringify(categoriaData),
    })
  }

  // Métodos para modelos
  async getModelos() {
    const result = await this.request("/modelo")
    return Array.isArray(result) ? result : []
  }

  async createModelo(modeloData) {
    return this.request("/modelo", {
      method: "POST",
      body: JSON.stringify(modeloData),
    })
  }

  // Métodos para mantenimientos
  async getMantenimientos() {
    const result = await this.request("/mantenimiento")
    return Array.isArray(result) ? result : []
  }

  async createMantenimiento(mantenimientoData) {
    return this.request("/mantenimiento", {
      method: "POST",
      body: JSON.stringify(mantenimientoData),
    })
  }

  async updateMantenimiento(id, mantenimientoData) {
    return this.request(`/mantenimiento/${id}`, {
      method: "PUT",
      body: JSON.stringify(mantenimientoData),
    })
  }

  async deleteMantenimiento(id) {
    return this.request(`/mantenimiento/${id}`, {
      method: "DELETE",
    })
  }

  // Métodos para préstamos
  async getPrestamos() {
    const result = await this.request("/prestamo_equipo")
    return Array.isArray(result) ? result : []
  }

  async createPrestamo(prestamoData) {
    return this.request("/prestamo_equipo", {
      method: "POST",
      body: JSON.stringify(prestamoData),
    })
  }

  async updatePrestamo(id, prestamoData) {
    return this.request(`/prestamo_equipo/${id}`, {
      method: "PUT",
      body: JSON.stringify(prestamoData),
    })
  }

  async deletePrestamo(id) {
    return this.request(`/prestamo_equipo/${id}`, {
      method: "DELETE",
    })
  }

  // Métodos para usuarios - corregir el endpoint
  async getUsuarios() {
    const result = await this.request("/usuario")
    return Array.isArray(result) ? result : []
  }

  async createUsuario(usuarioData) {
    return this.request("/usuario", {
      method: "POST",
      body: JSON.stringify(usuarioData),
    })
  }

  async updateUsuario(id, usuarioData) {
    return this.request(`/usuario/${id}`, {
      method: "PUT",
      body: JSON.stringify(usuarioData),
    })
  }

  async deleteUsuario(id) {
    return this.request(`/usuario/${id}`, {
      method: "DELETE",
    })
  }

  // Métodos para ubicaciones
  async getUbicaciones() {
    const result = await this.request("/ubicacion")
    return Array.isArray(result) ? result : []
  }

  async createUbicacion(ubicacionData) {
    return this.request("/ubicacion", {
      method: "POST",
      body: JSON.stringify(ubicacionData),
    })
  }

  // Métodos para hojas de vida
  async getHojasVida() {
    const result = await this.request("/hoja_vida_equipo")
    return Array.isArray(result) ? result : []
  }

  async getHojaVida(id) {
    return this.request(`/hoja_vida_equipo/${id}`)
  }

  async createHojaVida(hojaVidaData) {
    return this.request("/hoja_vida_equipo", {
      method: "POST",
      body: JSON.stringify(hojaVidaData),
    })
  }

  async updateHojaVida(id, hojaVidaData) {
    return this.request(`/hoja_vida_equipo/${id}`, {
      method: "PUT",
      body: JSON.stringify(hojaVidaData),
    })
  }

  async deleteHojaVida(id) {
    return this.request(`/hoja_vida_equipo/${id}`, {
      method: "DELETE",
    })
  }

  // Métodos para auditoría
  async getAuditoria() {
    const result = await this.request("/auditoria")
    return Array.isArray(result) ? result : []
  }

  async createRegistroAuditoria(auditoriaData) {
    return this.request("/auditoria", {
      method: "POST",
      body: JSON.stringify(auditoriaData),
    })
  }

  // Métodos para historial
  async getHistorial() {
    const result = await this.request("/historial")
    return Array.isArray(result) ? result : []
  }

  // Métodos de autenticación (si los implementas)
  async login(credentials) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (response.token) {
      this.token = response.token
      localStorage.setItem("authToken", response.token)
    }

    return response
  }

  async logout() {
    this.token = null
    localStorage.removeItem("authToken")
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated() {
    return !!this.token
  }

  // Agregar método para obtener estados de equipo
  async getEstadosEquipo() {
    const result = await this.request("/estado_equipo")
    return Array.isArray(result) ? result : []
  }

  // Agregar método para crear un estado de equipo
  async createEstadoEquipo(estadoData) {
    return this.request("/estado_equipo", {
      method: "POST",
      body: JSON.stringify(estadoData),
    })
  }

  // Agregar método para actualizar un estado de equipo
  async updateEstadoEquipo(id, estadoData) {
    return this.request(`/estado_equipo/${id}`, {
      method: "PUT",
      body: JSON.stringify(estadoData),
    })
  }

  // Agregar método para eliminar un estado de equipo
  async deleteEstadoEquipo(id) {
    return this.request(`/estado_equipo/${id}`, {
      method: "DELETE",
    })
  }

  // Método para obtener estadísticas del dashboard
  async getEstadisticas() {
    try {
      const [equipos, mantenimientos, prestamos, usuarios, estadosEquipo] = await Promise.all([
        this.getEquipos(),
        this.getMantenimientos(),
        this.getPrestamos(),
        this.getUsuarios(),
        this.getEstadosEquipo(),
      ])

      // Calcular equipos por estado
      const equiposPorEstado = {}
      if (Array.isArray(estadosEquipo)) {
        estadosEquipo.forEach((estado) => {
          const estadoNombre = estado.Estado_Entregado || "Sin estado"
          if (!equiposPorEstado[estadoNombre]) {
            equiposPorEstado[estadoNombre] = 0
          }
          equiposPorEstado[estadoNombre]++
        })
      }

      return {
        totales: {
          equipos: Array.isArray(equipos) ? equipos.length : 0,
          mantenimientos: Array.isArray(mantenimientos) ? mantenimientos.length : 0,
          prestamos: Array.isArray(prestamos) ? prestamos.length : 0,
          usuarios: Array.isArray(usuarios) ? usuarios.length : 0,
        },
        equiposPorEstado,
      }
    } catch (error) {
      console.error("Error al obtener estadísticas:", error)
      return {
        totales: {
          equipos: 0,
          mantenimientos: 0,
          prestamos: 0,
          usuarios: 0,
        },
        equiposPorEstado: {},
      }
    }
  }
}

// Create and export the API service instance
const apiServiceInstance = new ApiService()
export default apiServiceInstance
