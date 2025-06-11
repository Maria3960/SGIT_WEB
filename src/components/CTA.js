import { Link } from "react-router-dom"

function CTA() {
  return (
    <section className="py-5 text-center">
      <div className="container">
        <h2 className="mb-4">¿Listo para optimizar tu gestión de inventario?</h2>
        <p className="lead mb-4">Únete a cientos de empresas que ya confían en SGIT</p>
        <Link to="/login" className="btn btn-light btn-lg">
          Comenzar Ahora
        </Link>
      </div>
    </section>
  )
}

export default CTA
