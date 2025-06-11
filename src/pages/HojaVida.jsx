"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useHojasVida, useEquipos, useUsuarios, useEstadosEquipo } from "../hooks/useApi"
import ApiService from "../services/api"
import "../assets/css/inicio.css"
import "../assets/css/tablas.css"
import "../assets/css/modal.css"
import UserProfile from "../components/UserProfile"
import { usePerfil } from "../hooks/usePerfil";



const HojaVida = () => {
  const { perfil } = usePerfil(); 
  const { data: hojasVida, loading, error, refetch } = useHojasVida()
  const { data: equipos } = useEquipos()
  const { data: usuarios } = useUsuarios()
  const { data: estadosEquipo } = useEstadosEquipo()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedHojaVida, setSelectedHojaVida] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(true)
  const [formData, setFormData] = useState({
    Id_Equipos: "",
    Id_usuario: "",
    Estado_Equipo: "",
    Id_Estado_equipo: "",
    Fecha_ingreso: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const filteredHojasVida =
    hojasVida?.filter((hoja) =>
      Object.values(hoja).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
    ) || []

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log("Datos a enviar:", formData)

      if (selectedHojaVida) {
        await ApiService.updateHojaVida(selectedHojaVida.Id_Hoja_vida_equipo, formData)
        mostrarToast("Hoja de vida actualizada exitosamente")
      } else {
        await ApiService.createHojaVida(formData)
        mostrarToast("Hoja de vida creada exitosamente")
      }
      closeModal()
      refetch()
    } catch (error) {
      console.error("Error completo:", error)
      mostrarToast(`Error al guardar la hoja de vida: ${error.message}`, "error")
    }
  }

  const handleDelete = async () => {
    try {
      await ApiService.deleteHojaVida(selectedHojaVida.Id_Hoja_vida_equipo)
      mostrarToast("Hoja de vida eliminada exitosamente")
      closeModal()
      refetch()
    } catch (error) {
      console.error("Error al eliminar:", error)
      mostrarToast(`Error al eliminar la hoja de vida: ${error.message}`, "error")
    }
  }

  const openAddModal = () => {
    setFormData({
      Id_Equipos: "",
      Id_usuario: "",
      Estado_Equipo: "",
      Id_Estado_equipo: "",
      Fecha_ingreso: new Date().toISOString().split("T")[0],
    })
    setSelectedHojaVida(null)
    setShowAddModal(true)
  }

  const openEditModal = (hojaVida) => {
    setFormData({
      Id_Equipos: hojaVida.Id_Equipos || "",
      Id_usuario: hojaVida.Id_usuario || "",
      Estado_Equipo: hojaVida.Estado_Equipo || "",
      Id_Estado_equipo: hojaVida.Id_Estado_equipo || "",
      Fecha_ingreso: hojaVida.Fecha_ingreso ? hojaVida.Fecha_ingreso.split("T")[0] : "",
    })
    setSelectedHojaVida(hojaVida)
    setShowEditModal(true)
  }

  const openDeleteModal = (hojaVida) => {
    setSelectedHojaVida(hojaVida)
    setShowDeleteModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setShowEditModal(false)
    setShowDeleteModal(false)
    setSelectedHojaVida(null)
    setFormData({
      Id_Equipos: "",
      Id_usuario: "",
      Estado_Equipo: "",
      Id_Estado_equipo: "",
      Fecha_ingreso: "",
    })
  }

  const mostrarToast = (mensaje, tipo = "success") => {
    alert(`${tipo.toUpperCase()}: ${mensaje}`)
  }

  const toggleTheme = () => {
    setTemaOscuro(!temaOscuro)
  }

  const handleLogout = () => {
    navigate("/home")
  }

  if (error) {
    return <div>Error: {error}</div>
  }

 return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>SGIT</h2>
          <div className="theme-toggle">
            <i className="fa-solid fa-sun sun"></i>
            <label className="switch">
              <input
                type="checkbox"
                checked={temaOscuro}
                onChange={toggleTheme}
              />
              <span className="slider"></span>
            </label>
            <i className="fa-solid fa-moon moon"></i>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/inicio" className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow inventory-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-home nav-icon inventory-icon"></i>
                <span>Inicio</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-home nav-icon inventory-icon"></i>
                <span>Inicio</span>
              </div>
            </div>
          </Link>
          {(perfil?.Id_rol == "2" || perfil?.Id_rol == "1" || perfil?.Id_rol == "3") && (
          <Link to="/inventario" className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow inventory-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-box nav-icon inventory-icon"></i>
                <span>Inventario</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-box nav-icon inventory-icon"></i>
                <span>Inventario</span>
              </div>
            </div>
          </Link>
          )}
          {(perfil?.Id_rol == "2" || perfil?.Id_rol == "1") && (
            <Link to="/mantenimiento" className="nav-item">
              <div className="nav-link-wrapper">
                <div className="item-glow maintenance-glow"></div>
                <div className="nav-link-front">
                  <i className="fas fa-tools nav-icon maintenance-icon"></i>
                  <span>Mantenimiento</span>
                </div>
                <div className="nav-link-back">
                  <i className="fas fa-tools nav-icon maintenance-icon"></i>
                  <span>Mantenimiento</span>
                </div>
              </div>
            </Link>
          )}
          {(perfil?.Id_rol == "4" || perfil?.Id_rol == "1") && (
          <Link to="/Administracion" className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow maintenance-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-tools nav-icon maintenance-icon"></i>
                <span>Administracion</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-tools nav-icon maintenance-icon"></i>
                <span>Administracion</span>
              </div>
            </div>
          </Link>
         )}
          {(perfil?.Id_rol == "2" || perfil?.Id_rol == "1" || perfil?.Id_rol == "3") && (
          <Link to="/prestamo" className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow lifecycle-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-file-alt nav-icon lifecycle-icon"></i>
                <span>Prestamo</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-file-alt nav-icon lifecycle-icon"></i>
                <span>Prestamo</span>
              </div>
            </div>
          </Link>
          )}
          
          <Link to="/perfil" className="nav-item">
            <div className="nav-link-wrapper">
              <div className="item-glow profile-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-user nav-icon profile-icon"></i>
                <span>Perfil</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-user nav-icon profile-icon"></i>
                <span>Perfil</span>
              </div>
            </div>
          </Link>

          <div className="nav-item" onClick={handleLogout}>
            <div className="nav-link-wrapper">
              <div className="item-glow logout-glow"></div>
              <div className="nav-link-front">
                <i className="fas fa-sign-out-alt nav-icon logout-icon"></i>
                <span>Cerrar Sesión</span>
              </div>
              <div className="nav-link-back">
                <i className="fas fa-sign-out-alt nav-icon logout-icon"></i>
                <span>Cerrar Sesión</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>


      <main className="content">
        <div className="top-bar">
          <div className="top-bar-info">
            <h1>Hojas de Vida de Equipos</h1>
            <p>Gestión de hojas de vida de equipos</p>
          </div>
          <UserProfile />
        </div>

        <section className="hoja-vida-panel">
          <div className="panel-header">
            <h2>Hojas de Vida de Equipos</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar hoja de vida..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="action-button add-button" onClick={openAddModal}>
                <i className="fas fa-plus"></i> Nueva Hoja de Vida
              </button>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Lista de Hojas de Vida Registradas</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Equipo</th>
                  <th>Estado Equipo</th>
                  <th>Usuario</th>
                  <th>Estado Entregado</th>
                  <th>Estado Recibido</th>
                  <th>Fecha de Ingreso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="loading-message">
                      <div className="loading-spinner"></div>
                      <span>Cargando datos...</span>
                    </td>
                  </tr>
                ) : filteredHojasVida.length > 0 ? (
                  filteredHojasVida.map((hoja) => (
                    <tr key={hoja.Id_Hoja_vida_equipo}>
                      <td>{hoja.Id_Hoja_vida_equipo}</td>
                      <td>{hoja.Marca_Equipo || "N/A"}</td>
                      <td>{hoja.Estado_Equipo || "N/A"}</td>
                      <td>{`${hoja.Nombre_Usuario_1 || ""} ${hoja.Apellidos_Usuario_1 || ""}`.trim() || "N/A"}</td>
                      <td>{hoja.Estado_Entregado || "N/A"}</td>
                      <td>{hoja.Estado_Recibido || "N/A"}</td>
                      <td>{hoja.Fecha_ingreso ? new Date(hoja.Fecha_ingreso).toLocaleDateString() : "N/A"}</td>
                      <td className="actions-cell">
                        <button className="action-icon edit-icon" onClick={() => openEditModal(hoja)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="action-icon delete-icon" onClick={() => openDeleteModal(hoja)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No hay hojas de vida registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="pagination">
              <button className="pagination-button" disabled>
                <i className="fas fa-chevron-left"></i>
              </button>
              <span className="pagination-info">Página 1 de 1</span>
              <button className="pagination-button" disabled>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            <button className="action-button print-btn">
              <i className="fas fa-print"></i> Imprimir
            </button>
          </div>
        </section>
      </main>

      {/* Modal para Agregar/Editar Hoja de Vida */}
      {(showAddModal || showEditModal) && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <i className="fas fa-clipboard-list"></i> {selectedHojaVida ? "Editar" : "Nueva"} Hoja de Vida
              </h3>
              <span className="close-modal" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    <i className="fas fa-laptop"></i> Equipo:
                  </label>
                  <select name="Id_Equipos" value={formData.Id_Equipos} onChange={handleInputChange} required>
                    <option value="">Seleccione un equipo</option>
                    {equipos?.map((equipo) => (
                      <option key={equipo.Id_Equipos} value={equipo.Id_Equipos}>
                        {equipo.Marca_Equipo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <i className="fas fa-user"></i> Usuario:
                  </label>
                  <select name="Id_usuario" value={formData.Id_usuario} onChange={handleInputChange} required>
                    <option value="">Seleccione un usuario</option>
                    {usuarios?.map((usuario) => (
                      <option key={usuario.Id_Usuario} value={usuario.Id_Usuario}>
                        {`${usuario.Nombre_Usuario_1 || ""} ${usuario.Apellidos_Usuario_1 || ""}`.trim()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <i className="fas fa-info-circle"></i> Estado del Equipo:
                  </label>
                  <select name="Estado_Equipo" value={formData.Estado_Equipo} onChange={handleInputChange} required>
                    <option value="">Seleccione un estado</option>
                    <option value="Excelente">Excelente</option>
                    <option value="Bueno">Bueno</option>
                    <option value="Regular">Regular</option>
                    <option value="Malo">Malo</option>
                    <option value="Fuera de servicio">Fuera de servicio</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <i className="fas fa-cog"></i> Estado de Equipo (Registro):
                  </label>
                  <select
                    name="Id_Estado_equipo"
                    value={formData.Id_Estado_equipo}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione un estado</option>
                    {estadosEquipo?.map((estado) => (
                      <option key={estado.Id_Estado_equipo} value={estado.Id_Estado_equipo}>
                        {estado.Estado_Entregado} - {estado.Estado_Recibido}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <i className="fas fa-calendar-alt"></i> Fecha de Ingreso:
                  </label>
                  <input
                    type="date"
                    name="Fecha_ingreso"
                    value={formData.Fecha_ingreso}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="submit-button">
                    {selectedHojaVida ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Eliminar */}
      {showDeleteModal && selectedHojaVida && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content delete-modal">
            <div className="modal-header">
              <h3>
                <i className="fas fa-exclamation-triangle"></i> Confirmar Eliminación
              </h3>
              <span className="close-modal" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <p>
                ¿Está seguro que desea eliminar esta hoja de vida del equipo "{selectedHojaVida.Marca_Equipo}"? Esta
                acción no se puede deshacer.
              </p>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="button" className="delete-button" onClick={handleDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HojaVida
