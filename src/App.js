"use client"

import { Routes, Route } from "react-router-dom"
import './index.css'


import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import Inicio from "./pages/Inicio"
import Inventario from "./pages/Inventario"
import Mantenimiento from "./pages/Mantenimiento"
import Administracion from "./pages/Administracion"
import Prestamo from "./pages/Prestamo"
import Perfil from "./pages/Perfil"
import Consultar from "./pages/Consultar"
import Historial from "./pages/Historial"
import PQRS from "./pages/PQRS"
import Registros from "./pages/Registros"
import HojaVida from "./pages/HojaVida"
import Auditoria from "./pages/Auditoria"
import Login from "./pages/login"

// Componente para la página de inicio
const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <Features />
    <CTA />
    <Footer />
  </>
)

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/mantenimiento" element={<Mantenimiento />} />
        <Route path="/administracion" element={<Administracion />} />
        <Route path="/prestamo" element={<Prestamo />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/consultar" element={<Consultar />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/pqrs" element={<PQRS />} />
        <Route path="/registros" element={<Registros />} />
        <Route path="/hojavida" element={<HojaVida />} />
        <Route path="/auditoria" element={<Auditoria />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
