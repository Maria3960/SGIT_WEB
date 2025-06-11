"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useEstadisticas,
  useEquipos,
  useMantenimientos,
  usePrestamos,
  useUsuarios,
} from "../hooks/useApi";
import "../assets/css/inicio.css";
import "../assets/css/stats-cards.css";
import { usePerfil } from "../hooks/usePerfil";

const Inicio = () => {
  const navigate = useNavigate();
  const { data: estadisticasData, loading: loadingStats } = useEstadisticas();
  const { data: equipos, loading: loadingEquipos } = useEquipos();
  const { data: mantenimientos, loading: loadingMantenimientos } =
    useMantenimientos();
  const { data: prestamos, loading: loadingPrestamos } = usePrestamos();
  const { data: usuarios, loading: loadingUsuarios } = useUsuarios();

  const [temaOscuro, setTemaOscuro] = useState(true);
  const { perfil, loading: loadingPerfil } = usePerfil();

  // Calcular estadísticas en tiempo real
  const [estadisticas, setEstadisticas] = useState({
    equipos: 0,
    mantenimientos: 0,
    prestamos: 0,
    usuarios: 0,
    equiposActivos: 0,
    mantenimientosPendientes: 0,
    prestamosActivos: 0,
  });

  useEffect(() => {
    document.body.classList.toggle("dark", temaOscuro);
  }, [temaOscuro]);

  useEffect(() => {
    // Actualizar estadísticas cuando los datos cambien
    const nuevasEstadisticas = {
      equipos: Array.isArray(equipos) ? equipos.length : 0,
      mantenimientos: Array.isArray(mantenimientos) ? mantenimientos.length : 0,
      prestamos: Array.isArray(prestamos) ? prestamos.length : 0,
      usuarios: Array.isArray(usuarios) ? usuarios.length : 0,
      equiposActivos: Array.isArray(equipos)
        ? equipos.filter((e) => e.Estado_Equipo !== "Fuera de servicio").length
        : 0,
      mantenimientosPendientes: Array.isArray(mantenimientos)
        ? mantenimientos.filter((m) => !m.Fecha_fin_mantenimiento).length
        : 0,
      prestamosActivos: Array.isArray(prestamos)
        ? prestamos.filter(
            (p) =>
              !p.Fecha_entrega_prestamo ||
              new Date(p.Fecha_entrega_prestamo) > new Date()
          ).length
        : 0,
    };
    setEstadisticas(nuevasEstadisticas);
  }, [equipos, mantenimientos, prestamos, usuarios]);

  const toggleTheme = () => {
    setTemaOscuro(!temaOscuro);
  };

  const handleLogout = () => {
    navigate("/home");
  };

  const isLoading =
    loadingStats ||
    loadingEquipos ||
    loadingMantenimientos ||
    loadingPrestamos ||
    loadingUsuarios ||
    loadingPerfil;

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
            <h1>Inicio</h1>
            <p>Bienvenido al sistema de gestión de inventarios</p>
          </div>

          {perfil && (
            <div className="user-profile">
              <div className="user-avatar">
                {perfil.Usuario.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <div className="user-name">{perfil.Usuario}</div>
                <div className="user-role">
                  Rol: {perfil.Nombre_rol || perfil.Id_rol}
                </div>
              </div>
            </div>
          )}
        </div>

        <section className="stats-container">
          {isLoading ? (
            <div className="loading-message">
              <div className="loading-spinner"></div>
              <span>Cargando estadísticas...</span>
            </div>
          ) : (
            <>
              <div className="stat-card">
                <div className="stat-icon equipos">
                  <i className="fas fa-laptop"></i>
                </div>
                <div className="stat-value">{estadisticas.equipos}</div>
                <div className="stat-label">Equipos Registrados</div>
                <div className="stat-sublabel">
                  {estadisticas.equiposActivos} activos
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon mantenimientos">
                  <i className="fas fa-tools"></i>
                </div>
                <div className="stat-value">{estadisticas.mantenimientos}</div>
                <div className="stat-label">Mantenimientos</div>
                <div className="stat-sublabel">
                  {estadisticas.mantenimientosPendientes} pendientes
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon prestamos">
                  <i className="fas fa-handshake"></i>
                </div>
                <div className="stat-value">{estadisticas.prestamos}</div>
                <div className="stat-label">Préstamos</div>
                <div className="stat-sublabel">
                  {estadisticas.prestamosActivos} activos
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon usuarios">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-value">{estadisticas.usuarios}</div>
                <div className="stat-label">Usuarios</div>
                <div className="stat-sublabel">registrados</div>
              </div>
            </>
          )}
        </section>

        <section className="cards-container">
        {(perfil?.Id_rol == "1") && (
          <div className="card" onClick={() => navigate("/consultar")}>
            <div className="card-icon">
              <i className="fas fa-search"></i>
            </div>
            <h3>Consultar</h3>
            <p>Consulta los registros de inventario y préstamo</p>
          </div>
          )}
          {(perfil?.Id_rol == "4" || perfil?.Id_rol == "1") && (
          <div className="card" onClick={() => navigate("/historial")}>
            <div className="card-icon">
              <i className="fas fa-history"></i>
            </div>
            <h3>Historial</h3>
            <p>Consulta el historial de acciones y registros anteriores</p>
          </div>
          )}
          <div className="card" onClick={() => navigate("/pqrs")}>
            <div className="card-icon">
              <i className="fas fa-comment-dots"></i>
            </div>
            <h3>PQRS</h3>
            <p>Envía tus peticiones, quejas, reclamos y sugerencias</p>
          </div>
          {(perfil?.Id_rol == "1") && (
          <div className="card" onClick={() => navigate("/registros")}>
            <div className="card-icon">
              <i className="fas fa-clipboard-list"></i>
            </div>
            <h3>Registros</h3>
            <p>Realiza registros de inventario y dispositivos</p>
          </div>
          )}
          {(perfil?.Id_rol == "2" || perfil?.Id_rol == "1") && (
          <div className="card" onClick={() => navigate("/hojavida")}>
            <div className="card-icon">
              <i className="fas fa-clipboard-list"></i>
            </div>
            <h3>Hoja De Vida</h3>
            <p>Consultar la Hoja de vida de los equipos</p>
          </div>
          )}
          {(perfil?.Id_rol == "4" || perfil?.Id_rol == "1") && (
          <div className="card" onClick={() => navigate("/auditoria")}>
            <div className="card-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Auditoría</h3>
            <p>Historial de acciones y cambios en el sistema</p>
          </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Inicio;