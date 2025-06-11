import React, { useState } from "react";
import Swal from "sweetalert2";
import "../assets/css/styles.css";

const roles = {
  1: "Administrador",
  2: "Almacenista",
  3: "Profesor",
  4: "Mantenimiento",
};

const Login = () => {
  const [activeRole, setActiveRole] = useState(1);
  const [credentials, setCredentials] = useState({ usuario: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...credentials, rol: activeRole }),
      });

      if (!response.ok) {
        // Si status no es 2xx, lanza error para el catch
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token); // Guarda token
        Swal.fire('Bienvenido', `Hola ${data.usuario}`, 'success').then(() => {
          window.location.href = data.redirect;
        });      
      } else {
        Swal.fire("Error", data.message || "Credenciales incorrectas", "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        `No se pudo conectar con el servidor. ${error.message}`,
        "error"
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>

          <ul className="nav nav-tabs mb-3">
            {Object.entries(roles).map(([rol, nombre]) => (
              <li className="nav-item" key={rol}>
                <button
                  type="button"
                  className={`nav-link ${
                    parseInt(rol) === activeRole ? "active" : ""
                  }`}
                  onClick={() => setActiveRole(parseInt(rol))}
                >
                  {nombre}
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="rol" value={activeRole} />
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">
                Usuario
              </label>
              <input
                id="usuario"
                type="text"
                name="usuario" // <- aquí el cambio
                className="form-control"
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
