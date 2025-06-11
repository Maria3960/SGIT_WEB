"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export const usePerfil = () => {
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }

      try {
        // Usar la URL completa del servidor
        const { data } = await axios.get("http://localhost:5000/api/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPerfil(data)
        console.log("Perfil obtenido:", data)
      } catch (err) {
        console.error("Error al obtener el perfil:", err)
        console.error("Error response:", err.response)
        // Si el token es inválido, limpiarlo
        if (err.response?.status === 401) {
          localStorage.removeItem("token")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPerfil()
  }, [])

  return { perfil, loading }
}
