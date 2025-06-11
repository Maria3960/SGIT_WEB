"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useMantenimientos, useEquipos, useUsuarios } from "../hooks/useApi"
import ApiService from "../services/api"
import "../assets/css/inicio.css"
import "../assets/css/tablas.css"
import "../assets/css/modal.css"
import UserProfile from "../components/UserProfile"
import { usePerfil } from "../hooks/usePerfil";


const Mantenimiento = () => {
  const { perfil } = usePerfil(); 
  const { data: mantenimientos, loading, error, refetch } = useMantenimientos()
  const { data: equipos } = useEquipos()
  const { data: usuarios } = useUsuarios()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(true)
  const [formData, setFormData] = useState({
    Id_Equipos: "",
    Id_Usuario: "",
    Fecha_Inicio_mantenimiento: "",
    Fecha_fin_mantenimiento: "",
    Observaciones: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const filteredMantenimientos =
    mantenimientos?.filter((mantenimiento) =>
      Object.values(mantenimiento).some(
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
      if (selectedMantenimiento) {
        await ApiService.updateMantenimiento(selectedMantenimiento.Id_Mantenimiento, formData)
        mostrarToast("Mantenimiento actualizado exitosamente")
      } else {
        await ApiService.createMantenimiento(formData)
        mostrarToast("Mantenimiento creado exitosamente")
      }
      closeModal()
      refetch()
    } catch (error) {
      mostrarToast("Error al guardar el mantenimiento", "error")
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      await ApiService.deleteMantenimiento(selectedMantenimiento.Id_Mantenimiento)
      mostrarToast("Mantenimiento eliminado exitosamente")
      closeModal()
      refetch()
    } catch (error) {
      mostrarToast("Error al eliminar el mantenimiento", "error")
      console.error(error)
    }
  }

  const openAddModal = () => {
    setFormData({
      Id_Equipos: "",
      Id_Usuario: "",
      Fecha_Inicio_mantenimiento: "",
      Fecha_fin_mantenimiento: "",
      Observaciones: "",
    })
    setSelectedMantenimiento(null)
    setShowAddModal(true)
  }

  const openEditModal = (mantenimiento) => {
    setFormData({
      Id_Equipos: mantenimiento.Id_Equipos || "",
      Id_Usuario: mantenimiento.Id_Usuario || "",
      Fecha_Inicio_mantenimiento: mantenimiento.Fecha_Inicio_mantenimiento || "",
      Fecha_fin_mantenimiento: mantenimiento.Fecha_fin_mantenimiento || "",
      Observaciones: mantenimiento.Observaciones || "",
    })
    setSelectedMantenimiento(mantenimiento)
    setShowEditModal(true)
  }

  const openDeleteModal = (mantenimiento) => {
    setSelectedMantenimiento(mantenimiento)
    setShowDeleteModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setShowEditModal(false)
    setShowDeleteModal(false)
    setSelectedMantenimiento(null)
    setFormData({
      Id_Equipos: "",
      Id_Usuario: "",
      Fecha_Inicio_mantenimiento: "",
      Fecha_fin_mantenimiento: "",
      Observaciones: "",
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
            <h1>Mantenimiento</h1>
            <p>Gestión de mantenimientos de equipos</p>
          </div>
          <UserProfile />
        </div>

        <section className="maintenance-panel">
          <div className="panel-header">
            <h2>Registro de Mantenimientos</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar mantenimiento..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="action-button add-button" onClick={openAddModal}>
                <i className="fas fa-plus"></i> Registrar Mantenimiento
              </button>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Lista de Mantenimientos</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Equipo</th>
                  <th>Técnico</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Observaciones</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="loading-message">
                      <div className="loading-spinner"></div>
                      <span>Cargando datos...</span>
                    </td>
                  </tr>
                ) : filteredMantenimientos.length > 0 ? (
                  filteredMantenimientos.map((mantenimiento) => (
                    <tr key={mantenimiento.Id_Mantenimiento}>
                      <td>{mantenimiento.Id_Mantenimiento}</td>
                      <td>{mantenimiento.Marca_Equipo}</td>
                      <td>
                        {mantenimiento.Nombre_Usuario_1} {mantenimiento.Apellidos_Usuario_1}
                      </td>
                      <td>{mantenimiento.Fecha_Inicio_mantenimiento}</td>
                      <td>{mantenimiento.Fecha_fin_mantenimiento || "No definida"}</td>
                      <td>{mantenimiento.Observaciones || ""}</td>
                      <td className="actions-cell">
                        <button className="action-icon edit-icon" onClick={() => openEditModal(mantenimiento)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="action-icon delete-icon" onClick={() => openDeleteModal(mantenimiento)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No hay mantenimientos registrados
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

      {/* Modal para Agregar/Editar Mantenimiento */}
      {(showAddModal || showEditModal) && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <i className="fas fa-plus-circle"></i> {selectedMantenimiento ? "Editar" : "Registrar"} Mantenimiento
              </h3>
              <span className="close-modal" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    <i className="fas fa-box"></i> Equipo:
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
                    <i className="fas fa-user"></i> Técnico:
                  </label>
                  <select name="Id_Usuario" value={formData.Id_Usuario} onChange={handleInputChange} required>
                    <option value="">Seleccione un técnico</option>
                    {usuarios?.map((usuario) => (
                      <option key={usuario.Id_Usuario} value={usuario.Id_Usuario}>
                        {usuario.Nombre_Usuario_1} {usuario.Apellidos_Usuario_1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-calendar-alt"></i> Fecha de Inicio:
                  </label>
                  <input
                    type="date"
                    name="Fecha_Inicio_mantenimiento"
                    value={formData.Fecha_Inicio_mantenimiento}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-calendar-check"></i> Fecha de Finalización:
                  </label>
                  <input
                    type="date"
                    name="Fecha_fin_mantenimiento"
                    value={formData.Fecha_fin_mantenimiento}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-clipboard"></i> Observaciones:
                  </label>
                  <textarea
                    name="Observaciones"
                    value={formData.Observaciones}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Ingrese observaciones del mantenimiento"
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="submit-button">
                    {selectedMantenimiento ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Eliminar */}
      {showDeleteModal && selectedMantenimiento && (
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
              <p>¿Está seguro que desea eliminar este mantenimiento? Esta acción no se puede deshacer.</p>
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

export default Mantenimiento
