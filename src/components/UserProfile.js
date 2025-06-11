import { usePerfil } from "../hooks/usePerfil"

const UserProfile = () => {
  const { perfil, loading } = usePerfil()

  if (loading) {
    return (
      <div className="user-profile">
        <div className="user-avatar">U</div>
        <div className="user-info">
          <div className="user-name">Cargando...</div>
          <div className="user-role">...</div>
        </div>
      </div>
    )
  }

  if (!perfil) {
    return (
      <div className="user-profile">
        <div className="user-avatar">U</div>
        <div className="user-info">
          <div className="user-name">Usuario</div>
          <div className="user-role">Sin sesión</div>
        </div>
      </div>
    )
  }

  const getRoleName = (idRol) => {
    const roles = {
      1: "Administrador",
      2: "Almacenista",
      3: "Docente",
      4: "Técnico",
    }
    return roles[idRol] || "Usuario"
  }

  const nombreCompleto =
    `${perfil.Nombre_Usuario_1 || ""} ${perfil.Nombre_Usuario_2 || ""} ${perfil.Apellidos_Usuario_1 || ""} ${perfil.Apellidos_Usuario_2 || ""}`.trim()
  const iniciales = nombreCompleto ? nombreCompleto.charAt(0).toUpperCase() : "U"

  return (
    <div className="user-profile">
      <div className="user-avatar">{iniciales}</div>
      <div className="user-info">
        <div className="user-name">{nombreCompleto || perfil.Usuario || "Usuario"}</div>
        <div className="user-role">
          Rol: {getRoleName(perfil.Id_Rol)} (ID: {perfil.Id_Rol})
        </div>
      </div>
    </div>
  )
}

export default UserProfile
