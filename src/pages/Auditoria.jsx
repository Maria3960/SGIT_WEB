"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuditoria } from "../hooks/useApi"
import "../assets/css/inicio.css"
import "../assets/css/tablas.css"
import "../assets/css/modal.css"
import UserProfile from "../components/UserProfile"
import { usePerfil } from "../hooks/usePerfil";

const Auditoria = () => {
  const { perfil } = usePerfil(); 
  const { data: auditEntries, loading, error } = useAuditoria()
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

  // Si no hay datos de la API, usamos datos de ejemplo
  const entries =
    auditEntries?.length > 0
      ? auditEntries
      : [
          {
            id: 1,
            fecha: "2024-01-15 10:30:00",
            usuario: "Juan Pérez",
            accion: "Creación de equipo",
            detalle: "Se registró un nuevo equipo Dell Inspiron 15",
          },
          {
            id: 2,
            fecha: "2024-01-15 11:45:00",
            usuario: "María García",
            accion: "Actualización de mantenimiento",
            detalle: "Se completó el mantenimiento preventivo del equipo HP-001",
          },
          {
            id: 3,
            fecha: "2024-01-15 14:20:00",
            usuario: "Carlos López",
            accion: "Préstamo de equipo",
            detalle: "Se prestó el equipo Samsung Monitor 24' al usuario Ana Rodríguez",
          },
          {
            id: 4,
            fecha: "2024-01-16 09:15:00",
            usuario: "Ana Rodríguez",
            accion: "Devolución de equipo",
            detalle: "Se devolvió el equipo Samsung Monitor 24' en buen estado",
          },
          {
            id: 5,
            fecha: "2024-01-16 15:30:00",
            usuario: "Luis Martínez",
            accion: "Actualización de usuario",
            detalle: "Se actualizó la información de contacto del usuario ID: 15",
          },
        ]

  const filteredEntries = entries.filter((entry) =>
    Object.values(entry).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

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

  const handlePrint = () => {
    window.print()
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
            <h1>Auditoría</h1>
            <p>Historial de acciones y cambios en el sistema</p>
          </div>
          <UserProfile />
        </div>

        <section className="audit-log">
          <div className="panel-header">
            <h2>Historial de Auditoría</h2>
            <div className="panel-actions">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar en auditoría..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
              </div>
              <button className="action-button print-btn" onClick={handlePrint}>
                <i className="fas fa-print"></i> Imprimir
              </button>
            </div>
          </div>

          <div id="printable" className="table-responsive">
            <table className="data-table">
              <caption>Registro de Auditoría del Sistema</caption>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Usuario</th>
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
                  filteredEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.id}</td>
                      <td>{new Date(entry.fecha).toLocaleString()}</td>
                      <td>{entry.usuario}</td>
                      <td>{entry.accion}</td>
                      <td className="actions-cell">
                        <button
                          className="action-icon view-icon"
                          onClick={() => verDetalle(entry)}
                          title="Ver detalles"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      {error ? `Error: ${error}` : "No hay registros de auditoría disponibles"}
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
                <i className="fas fa-info-circle"></i> Detalles de la Acción
              </h3>
              <span className="close-modal" onClick={() => setShowDetailModal(false)}>
                &times;
              </span>
            </div>
            <div className="modal-body">
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-hashtag"></i> ID:
                </strong>
                <span>{selectedEntry.id}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-calendar"></i> Fecha:
                </strong>
                <span>{new Date(selectedEntry.fecha).toLocaleString()}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-user"></i> Usuario:
                </strong>
                <span>{selectedEntry.usuario}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-tasks"></i> Acción:
                </strong>
                <span>{selectedEntry.accion}</span>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-info-circle"></i> Descripción detallada:
                </strong>
                <p>{selectedEntry.detalle}</p>
              </div>
              <div className="detalle-item">
                <strong>
                  <i className="fas fa-clock"></i> Timestamp:
                </strong>
                <span>{new Date(selectedEntry.fecha).toISOString()}</span>
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

export default Auditoria
