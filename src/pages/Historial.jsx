"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useHistorial } from "../hooks/useApi"
import "../assets/css/inicio.css"
import "../assets/css/tablas.css"
import "../assets/css/modal.css"
import UserProfile from "../components/UserProfile"
import { usePerfil } from "../hooks/usePerfil";


const Historial = () => {
  const { perfil } = usePerfil(); 
  const { data: historialEntries, loading, error } = useHistorial()
  const [searchTerm, setSearchTerm] = useState("")
  const [temaOscuro, setTemaOscuro] = useState(true)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [temaOscuro])

  const filteredEntries =
    historialEntries?.filter((entry) =>
      Object.values(entry).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
    ) || []

  const verDetalle = (entry) => {
    setSelectedEntry(entry)
    setShowDetailModal(true)
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
            <h1>Historial</h1>
            <p>Registro de actividades y eventos</p>
          </div>
          <UserProfile />
        </div>

        <section className="activity-history">
          <div className="panel-header">
            <h2>Historial de Actividades</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar actividad..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="action-button print-btn">
                <i className="fas fa-print"></i> Imprimir
              </button>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Registro de Actividades del Sistema</caption>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Usuario</th>
                  <th>Equipo</th>
                  <th>Acción Realizada</th>
                  <th>Detalle</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="loading-message">
                      <div className="loading-spinner"></div>
                      <span>Cargando datos...</span>
                    </td>
                  </tr>
                ) : filteredEntries.length > 0 ? (
                  filteredEntries.map((entry, index) => (
                    <tr key={index}>
                      <td>{new Date(entry.Fecha).toLocaleDateString()}</td>
                      <td>{entry.Usuario}</td>
                      <td>{entry.Equipo}</td>
                      <td>{entry.Accion}</td>
                      <td className="actions-cell">
                        <button className="action-icon view-icon" onClick={() => verDetalle(entry)}>
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No hay registros de actividades disponibles
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
          </div>
        </section>
      </main>

      {/* Modal para Ver Detalles */}
      {showDetailModal && selectedEntry && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                <i className="fas fa-info-circle"></i> Detalles de la Actividad
              </h3>
              <span className="close-modal" onClick={() => setShowDetailModal(false)}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-calendar"></i> Fecha:
                </strong>
                <span>{new Date(selectedEntry.Fecha).toLocaleString()}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-user"></i> Usuario:
                </strong>
                <span>{selectedEntry.Usuario}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-laptop"></i> Equipo:
                </strong>
                <span>{selectedEntry.Equipo}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-tasks"></i> Acción:
                </strong>
                <span>{selectedEntry.Accion}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-tag"></i> Tipo:
                </strong>
                <span>{selectedEntry.Tipo}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-info-circle"></i> Información adicional:
                </strong>
                <p>
                  Detalles completos de la actividad. Esta información incluye el estado del equipo, la ubicación, y
                  cualquier otra información relevante para el seguimiento de la actividad.
                </p>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowDetailModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Historial
