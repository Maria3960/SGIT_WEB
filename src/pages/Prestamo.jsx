"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { usePrestamos, useEquipos, useUsuarios, useUbicaciones } from "../hooks/useApi"
import ApiService from "../services/api"
import "../assets/css/inicio.css"
import "../assets/css/tablas.css"
import "../assets/css/modal.css"
import UserProfile from "../components/UserProfile"
import { usePerfil } from "../hooks/usePerfil";


const Prestamo = () => {
  const { perfil } = usePerfil(); 
  const { data: prestamos, loading, error, refetch } = usePrestamos()
  const { data: equipos } = useEquipos()
  const { data: usuarios } = useUsuarios()
  const { data: ubicaciones } = useUbicaciones()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPrestamo, setSelectedPrestamo] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(true)
  // Actualizar el formulario para incluir el estado del equipo
  const [formData, setFormData] = useState({
    Fecha_Prestamo_Equipo: "",
    Fecha_entrega_prestamo: "",
    Id_Usuario: "",
    Id_Equipos: "",
    Id_Ubicacion: "",
    Id_Estado_Equipo: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const filteredPrestamos =
    prestamos?.filter((prestamo) =>
      Object.values(prestamo).some(
        (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
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
      if (selectedPrestamo) {
        await ApiService.updatePrestamo(selectedPrestamo.Id_Prestamo_Equipo, formData)
        mostrarToast("Préstamo actualizado exitosamente")
      } else {
        await ApiService.createPrestamo(formData)
        mostrarToast("Préstamo creado exitosamente")
      }
      closeModal()
      refetch()
    } catch (error) {
      mostrarToast("Error al guardar el préstamo", "error")
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      await ApiService.deletePrestamo(selectedPrestamo.Id_Prestamo_Equipo)
      mostrarToast("Préstamo eliminado exitosamente")
      closeModal()
      refetch()
    } catch (error) {
      mostrarToast("Error al eliminar el préstamo", "error")
      console.error(error)
    }
  }

  const openAddModal = () => {
    setFormData({
      Fecha_Prestamo_Equipo: "",
      Fecha_entrega_prestamo: "",
      Id_Usuario: "",
      Id_Equipos: "",
      Id_Ubicacion: "",
      Id_Estado_Equipo: "",
    })
    setSelectedPrestamo(null)
    setShowAddModal(true)
  }

  // Actualizar la función openEditModal para incluir el estado del equipo
  const openEditModal = (prestamo) => {
    setFormData({
      Fecha_Prestamo_Equipo: prestamo.Fecha_Prestamo_Equipo || "",
      Fecha_entrega_prestamo: prestamo.Fecha_entrega_prestamo || "",
      Id_Usuario: prestamo.Id_Usuario || "",
      Id_Equipos: prestamo.Id_Equipos || "",
      Id_Ubicacion: prestamo.Id_Ubicacion || "",
      Id_Estado_Equipo: prestamo.Id_Estado_Equipo || "",
    })
    setSelectedPrestamo(prestamo)
    setShowEditModal(true)
  }

  const openDeleteModal = (prestamo) => {
    setSelectedPrestamo(prestamo)
    setShowDeleteModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setShowEditModal(false)
    setShowDeleteModal(false)
    setSelectedPrestamo(null)
    setFormData({
      Fecha_Prestamo_Equipo: "",
      Fecha_entrega_prestamo: "",
      Id_Usuario: "",
      Id_Equipos: "",
      Id_Ubicacion: "",
      Id_Estado_Equipo: "",
    })
  }

  const mostrarToast = (mensaje, tipo = "success") => {
    alert(`${tipo}: ${mensaje}`)
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
            <h1>Préstamos</h1>
            <p>Gestión de préstamos de equipos</p>
          </div>
          <UserProfile />
        </div>

        <section className="prestamo-panel">
          <div className="panel-header">
            <h2>Préstamos de Equipos</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar préstamo..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="action-button add-button" onClick={openAddModal}>
                <i className="fas fa-plus"></i> Nuevo Préstamo
              </button>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Lista de Préstamos Registrados</caption>
              <thead>
                <tr>
                  <th>ID Préstamo</th>
                  <th>Fecha Préstamo</th>
                  <th>Fecha Entrega</th>
                  <th>Usuario</th>
                  <th>Marca Equipo</th>
                  <th>Ubicación</th>
                  <th>Estado Entregado</th>
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
                ) : filteredPrestamos.length > 0 ? (
                  filteredPrestamos.map((prestamo) => (
                    <tr key={prestamo.Id_Prestamo_Equipo}>
                      <td>{prestamo.Id_Prestamo_Equipo}</td>
                      <td>{prestamo.Fecha_Prestamo_Equipo}</td>
                      <td>{prestamo.Fecha_entrega_prestamo}</td>
                      <td>
                        {prestamo.Nombre_Usuario_1} {prestamo.Apellidos_Usuario_1}
                      </td>
                      <td>{prestamo.Marca_Equipo}</td>
                      <td>{prestamo.Nombre_Ubicacion}</td>
                      <td>{prestamo.Estado_Entregado}</td>
                      <td className="actions-cell">
                        <button className="action-icon edit-icon" onClick={() => openEditModal(prestamo)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="action-icon delete-icon" onClick={() => openDeleteModal(prestamo)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No hay préstamos registrados
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

      {/* Modal para Agregar/Editar Préstamo */}
      {(showAddModal || showEditModal) && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <i className="fas fa-plus-circle"></i> {selectedPrestamo ? "Editar" : "Nuevo"} Préstamo
              </h3>
              <span className="close-modal" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    <i className="fas fa-calendar-alt"></i> Fecha de Préstamo:
                  </label>
                  <input
                    type="date"
                    name="Fecha_Prestamo_Equipo"
                    value={formData.Fecha_Prestamo_Equipo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-calendar-check"></i> Fecha de Entrega:
                  </label>
                  <input
                    type="date"
                    name="Fecha_entrega_prestamo"
                    value={formData.Fecha_entrega_prestamo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-user"></i> Usuario:
                  </label>
                  <select name="Id_Usuario" value={formData.Id_Usuario} onChange={handleInputChange} required>
                    <option value="">Seleccione un usuario</option>
                    {usuarios?.map((usuario) => (
                      <option key={usuario.Id_Usuario} value={usuario.Id_Usuario}>
                        {usuario.Nombre_Usuario_1} {usuario.Apellidos_Usuario_1}
                      </option>
                    ))}
                  </select>
                </div>
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
                    <i className="fas fa-map-marker-alt"></i> Ubicación:
                  </label>
                  <select name="Id_Ubicacion" value={formData.Id_Ubicacion} onChange={handleInputChange} required>
                    <option value="">Seleccione una ubicación</option>
                    {ubicaciones?.map((ubicacion) => (
                      <option key={ubicacion.Id_Ubicacion} value={ubicacion.Id_Ubicacion}>
                        {ubicacion.Nombre_Ubicacion}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Actualizar el formulario en el modal para incluir el campo de estado del equipo */}
                <div className="form-group">
                  <label>
                    <i className="fas fa-check-circle"></i> Estado del Equipo:
                  </label>
                  <select
                    name="Id_Estado_Equipo"
                    value={formData.Id_Estado_Equipo}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione un estado</option>
                    <option value="1">Total Funcionamiento</option>
                    <option value="2">Funciona pero Bajo rendimiento</option>
                    <option value="3">Funciona pero tiene cable de carga roto</option>
                    <option value="4">Funciona pero no tiene internet</option>
                    <option value="5">Fuera de servicio</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="submit-button">
                    {selectedPrestamo ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Eliminar */}
      {showDeleteModal && selectedPrestamo && (
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
              <p>¿Está seguro que desea eliminar este préstamo? Esta acción no se puede deshacer.</p>
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

export default Prestamo
