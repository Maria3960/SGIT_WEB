"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUsuarios } from "../hooks/useApi"
import ApiService from "../services/api"
import "../assets/css/inicio.css"
import "../assets/css/tablas.css"
import "../assets/css/modal.css"
import UserProfile from "../components/UserProfile"
import { usePerfil } from "../hooks/usePerfil";


const Administracion = () => {
  const { perfil } = usePerfil(); 
  const { data: usuarios, loading, error, refetch } = useUsuarios()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedUsuario, setSelectedUsuario] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(true)
  const [formData, setFormData] = useState({
    Usuario: "",
    Nombre_Usuario_1: "",
    Nombre_Usuario_2: "",
    Apellidos_Usuario_1: "",
    Apellidos_Usuario_2: "",
    Telefono_1_Usuario: "",
    Telefono_2_Usuario: "",
    Correo_Usuario: "",
    Contraseña: "",
    Id_Rol: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const filteredUsuarios =
    usuarios?.filter((usuario) =>
      Object.values(usuario).some(
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
      if (selectedUsuario) {
        await ApiService.updateUsuario(selectedUsuario.Id_Usuario, formData)
        mostrarToast("Usuario actualizado exitosamente")
      } else {
        await ApiService.createUsuario(formData)
        mostrarToast("Usuario creado exitosamente")
      }
      closeModal()
      refetch()
    } catch (error) {
      mostrarToast("Error al guardar el usuario", "error")
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      await ApiService.deleteUsuario(selectedUsuario.Id_Usuario)
      mostrarToast("Usuario eliminado exitosamente")
      closeModal()
      refetch()
    } catch (error) {
      mostrarToast("Error al eliminar el usuario", "error")
      console.error(error)
    }
  }

  const openAddModal = () => {
    setFormData({
      Usuario: "",
      Nombre_Usuario_1: "",
      Nombre_Usuario_2: "",
      Apellidos_Usuario_1: "",
      Apellidos_Usuario_2: "",
      Telefono_1_Usuario: "",
      Telefono_2_Usuario: "",
      Correo_Usuario: "",
      Contraseña: "",
      Id_Rol: "",
    })
    setSelectedUsuario(null)
    setShowAddModal(true)
  }

  const openEditModal = (usuario) => {
    setFormData({
      Usuario: usuario.Usuario || "",
      Nombre_Usuario_1: usuario.Nombre_Usuario_1 || "",
      Nombre_Usuario_2: usuario.Nombre_Usuario_2 || "",
      Apellidos_Usuario_1: usuario.Apellidos_Usuario_1 || "",
      Apellidos_Usuario_2: usuario.Apellidos_Usuario_2 || "",
      Telefono_1_Usuario: usuario.Telefono_1_Usuario || "",
      Telefono_2_Usuario: usuario.Telefono_2_Usuario || "",
      Correo_Usuario: usuario.Correo_Usuario || "",
      Contraseña: "", // No mostrar contraseña por seguridad
      Id_Rol: usuario.Id_Rol || "",
    })
    setSelectedUsuario(usuario)
    setShowEditModal(true)
  }

  const openDeleteModal = (usuario) => {
    setSelectedUsuario(usuario)
    setShowDeleteModal(true)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setShowEditModal(false)
    setShowDeleteModal(false)
    setSelectedUsuario(null)
    setFormData({
      Usuario: "",
      Nombre_Usuario_1: "",
      Nombre_Usuario_2: "",
      Apellidos_Usuario_1: "",
      Apellidos_Usuario_2: "",
      Telefono_1_Usuario: "",
      Telefono_2_Usuario: "",
      Correo_Usuario: "",
      Contraseña: "",
      Id_Rol: "",
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

  const getRoleName = (idRol) => {
    const roles = {
      1: "Administrador",
      2: "Almacenista",
      3: "Docente",
      4: "Técnico",
    }
    return roles[idRol] || "Sin rol"
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
            <h1>Administración</h1>
            <p>Gestión de usuarios del sistema</p>
          </div>
          <UserProfile />
        </div>

        <section className="admin-panel">
          <div className="panel-header">
            <h2>Gestión de Usuarios</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar usuario..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="action-button add-button" onClick={openAddModal}>
                <i className="fas fa-plus"></i> Agregar Usuario
              </button>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Lista de Usuarios del Sistema</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Nombre Completo</th>
                  <th>Correo</th>
                  <th>Teléfono</th>
                  <th>Rol</th>
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
                ) : filteredUsuarios.length > 0 ? (
                  filteredUsuarios.map((usuario) => (
                    <tr key={usuario.Id_Usuario}>
                      <td>{usuario.Id_Usuario}</td>
                      <td>{usuario.Usuario}</td>
                      <td>
                        {usuario.Nombre_Usuario_1} {usuario.Nombre_Usuario_2 && usuario.Nombre_Usuario_2 + " "}
                        {usuario.Apellidos_Usuario_1} {usuario.Apellidos_Usuario_2}
                      </td>
                      <td>{usuario.Correo_Usuario}</td>
                      <td>{usuario.Telefono_1_Usuario}</td>
                      <td>{getRoleName(usuario.Id_Rol)}</td>
                      <td className="actions-cell">
                        <button className="action-icon edit-icon" onClick={() => openEditModal(usuario)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="action-icon delete-icon" onClick={() => openDeleteModal(usuario)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No hay usuarios registrados
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

      {/* Modal para Agregar/Editar Usuario */}
      {(showAddModal || showEditModal) && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <i className="fas fa-user-plus"></i> {selectedUsuario ? "Editar" : "Agregar"} Usuario
              </h3>
              <span className="close-modal" onClick={closeModal}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user"></i> Usuario:
                    </label>
                    <input
                      type="text"
                      name="Usuario"
                      value={formData.Usuario}
                      onChange={handleInputChange}
                      required
                      placeholder="Nombre de usuario"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-lock"></i> Contraseña:
                    </label>
                    <input
                      type="password"
                      name="Contraseña"
                      value={formData.Contraseña}
                      onChange={handleInputChange}
                      required={!selectedUsuario}
                      placeholder="Contraseña"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user"></i> Primer Nombre:
                    </label>
                    <input
                      type="text"
                      name="Nombre_Usuario_1"
                      value={formData.Nombre_Usuario_1}
                      onChange={handleInputChange}
                      required
                      placeholder="Primer nombre"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user"></i> Segundo Nombre:
                    </label>
                    <input
                      type="text"
                      name="Nombre_Usuario_2"
                      value={formData.Nombre_Usuario_2}
                      onChange={handleInputChange}
                      placeholder="Segundo nombre (opcional)"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user"></i> Primer Apellido:
                    </label>
                    <input
                      type="text"
                      name="Apellidos_Usuario_1"
                      value={formData.Apellidos_Usuario_1}
                      onChange={handleInputChange}
                      required
                      placeholder="Primer apellido"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user"></i> Segundo Apellido:
                    </label>
                    <input
                      type="text"
                      name="Apellidos_Usuario_2"
                      value={formData.Apellidos_Usuario_2}
                      onChange={handleInputChange}
                      placeholder="Segundo apellido (opcional)"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-envelope"></i> Correo:
                  </label>
                  <input
                    type="email"
                    name="Correo_Usuario"
                    value={formData.Correo_Usuario}
                    onChange={handleInputChange}
                    required
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <i className="fas fa-phone"></i> Teléfono Principal:
                    </label>
                    <input
                      type="tel"
                      name="Telefono_1_Usuario"
                      value={formData.Telefono_1_Usuario}
                      onChange={handleInputChange}
                      required
                      placeholder="Número de teléfono"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-phone"></i> Teléfono Secundario:
                    </label>
                    <input
                      type="tel"
                      name="Telefono_2_Usuario"
                      value={formData.Telefono_2_Usuario}
                      onChange={handleInputChange}
                      placeholder="Teléfono secundario (opcional)"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    <i className="fas fa-user-tag"></i> Rol:
                  </label>
                  <select name="Id_Rol" value={formData.Id_Rol} onChange={handleInputChange} required>
                    <option value="">Seleccione un rol</option>
                    <option value="1">Administrador</option>
                    <option value="2">Almacenista</option>
                    <option value="3">Docente</option>
                    <option value="4">Técnico</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={closeModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="submit-button">
                    {selectedUsuario ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Eliminar */}
      {showDeleteModal && selectedUsuario && (
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
                ¿Está seguro que desea eliminar al usuario "{selectedUsuario.Nombre_Usuario_1}{" "}
                {selectedUsuario.Apellidos_Usuario_1}"? Esta acción no se puede deshacer.
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

export default Administracion
