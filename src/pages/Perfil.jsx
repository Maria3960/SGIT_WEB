"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../assets/css/inicio.css"
import "../assets/css/tablas.css"
import "../assets/css/modal.css"
import { usePerfil } from "../hooks/usePerfil";


const Perfil = () => {
  const { perfil } = usePerfil(); 
  const [temaOscuro, setTemaOscuro] = useState(true)
  const [editando, setEditando] = useState(false)
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.toggle("dark", temaOscuro)
  }, [temaOscuro])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    fetch("http://localhost:5000/api/auth/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el perfil")
        return res.json()
      })
      .then((data) => {
        if (!data || !data.nombre) throw new Error("Datos de usuario inválidos")
        setUsuario(data)
      })
      .catch((err) => {
        console.error("Error obteniendo perfil", err)
        alert("No se pudo cargar el perfil. Inicia sesión nuevamente.")
        navigate("/login")
      })
      .finally(() => setCargando(false))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUsuario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/api/auth/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          email: usuario.email,
          telefono: usuario.telefono,
        }),
      })
      if (!res.ok) throw new Error("Error al actualizar perfil")
      alert("Perfil actualizado correctamente.")
      setEditando(false)
    } catch (error) {
      console.error(error)
      alert("Error al actualizar el perfil.")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/home")
  }

  const toggleTheme = () => {
    setTemaOscuro((prev) => !prev)
  }

  if (cargando) return <div className="content">Cargando perfil...</div>
  if (!usuario) return <div className="content">No se encontraron datos del usuario.</div>

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
            <h1>Perfil</h1>
            <p>Información personal y configuración</p>
          </div>
          <div className="user-profile">
            <div className="user-avatar">{usuario.nombre?.charAt(0)}</div>
            <div className="user-info">
              <div className="user-name">{usuario.nombre}</div>
              <div className="user-role">
                Rol: {usuario.rol || "Usuario"} (ID: {usuario.id})
              </div>
            </div>
          </div>
        </div>

        <section className="profile" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <div className="profile-header" style={{ textAlign: "center", marginBottom: "40px" }}>
            <div
              className="user-avatar"
              style={{ width: "120px", height: "120px", fontSize: "3rem", margin: "0 auto 20px" }}
            >
              {usuario.nombre?.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ marginBottom: "10px" }}>
              Bienvenido, {usuario.nombre} {usuario.apellido}
            </h2>
            <p>
              {usuario.cargo} - {usuario.departamento}
            </p>
          </div>

          <div className="profile-info">
            <div className="card" style={{ padding: "30px", borderRadius: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
                <h3>
                  <i className="fas fa-user-edit" /> Información Personal
                </h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user" /> Usuario:
                    </label>
                    <input type="text" value={usuario.Usuario || ""} disabled />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user" /> Nombre Completo:
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={`${usuario.nombre || ""} ${usuario.apellido || ""}`.trim()}
                      onChange={handleInputChange}
                      disabled={!editando}
                    />
                  </div>
                </div>

                <div className="row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-envelope" /> Correo Electrónico:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={usuario.email || ""}
                      onChange={handleInputChange}
                      disabled={!editando}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-phone" /> Teléfono:
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={usuario.telefono || ""}
                      onChange={handleInputChange}
                      disabled={!editando}
                    />
                  </div>
                </div>

                <div className="row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-briefcase" /> Cargo:
                    </label>
                    <input type="text" value={usuario.cargo || ""} disabled />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-building" /> Departamento:
                    </label>
                    <input type="text" value={usuario.departamento || ""} disabled />
                  </div>
                </div>

                <div className="row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-id-badge" /> ID Usuario:
                    </label>
                    <input type="text" value={usuario.id || ""} disabled />
                  </div>
                  <div className="form-group">
                    <label>
                      <i className="fas fa-user-tag" /> Rol:
                    </label>
                    <input type="text" value={usuario.Nombre_rol || usuario.cargo || ""} disabled />
                  </div>
                </div>

                {editando && (
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}>
                    <button type="button" className="cancel-button" onClick={() => setEditando(false)}>
                      <i className="fas fa-times" /> Cancelar
                    </button>
                    <button type="submit" className="submit-button">
                      <i className="fas fa-save" /> Guardar Cambios
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Perfil
