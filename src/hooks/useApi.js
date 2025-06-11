"use client"

import { useState, useEffect, useCallback } from "react"
import ApiService from "../services/api"

// Hook personalizado para manejar llamadas a la API
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const memoizedApiCall = useCallback(apiCall, [apiCall])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await memoizedApiCall()
        // Asegurar que siempre devolvemos un array para listas
        setData(Array.isArray(result) ? result : [])
      } catch (err) {
        setError(err.message)
        setData([]) // Devolver array vacío en caso de error
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedApiCall, ...dependencies])

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await memoizedApiCall()
      setData(Array.isArray(result) ? result : [])
    } catch (err) {
      setError(err.message)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

// Hook para equipos
export const useEquipos = () => {
  const apiCall = useCallback(async () => {
    const result = await ApiService.getEquipos()
    return Array.isArray(result) ? result : []
  }, [])
  return useApi(apiCall)
}

// Hook para categorías
export const useCategorias = () => {
  const apiCall = useCallback(async () => {
    const result = await ApiService.getCategorias()
    return Array.isArray(result) ? result : []
  }, [])
  return useApi(apiCall)
}

// Hook para modelos
export const useModelos = () => {
  const apiCall = useCallback(async () => {
    const result = await ApiService.getModelos()
    return Array.isArray(result) ? result : []
  }, [])
  return useApi(apiCall)
}

// Hook para mantenimientos
export const useMantenimientos = () => {
  const apiCall = useCallback(async () => {
    const result = await ApiService.getMantenimientos()
    return Array.isArray(result) ? result : []
  }, [])
  return useApi(apiCall)
}

// Hook para préstamos
export const usePrestamos = () => {
  const apiCall = useCallback(async () => {
    const result = await ApiService.getPrestamos()
    return Array.isArray(result) ? result : []
  }, [])
  return useApi(apiCall)
}

// Hook para usuarios
export const useUsuarios = () => {
  const apiCall = useCallback(async () => {
    const result = await ApiService.getUsuarios()
    return Array.isArray(result) ? result : []
  }, [])
  return useApi(apiCall)
}

// Hook para ubicaciones
export const useUbicaciones = () => {
  const apiCall = useCallback(async () => {
    const result = await ApiService.getUbicaciones()
    return Array.isArray(result) ? result : []
  }, [])
  return useApi(apiCall)
}

// Hook para hojas de vida
export const useHojasVida = () => {
  const apiCall = useCallback(async () => {
    const result = await ApiService.getHojasVida()
    return Array.isArray(result) ? result : []
  }, [])
  return useApi(apiCall)
}

// Hook para auditoría
export const useAuditoria = () => {
  const apiCall = useCallback(async () => {
    const result = await ApiService.getAuditoria()
    return Array.isArray(result) ? result : []
  }, [])
  return useApi(apiCall)
}

// Hook para historial
export const useHistorial = () => {
  const apiCall = useCallback(async () => {
    const result = await ApiService.getHistorial()
    return Array.isArray(result) ? result : []
  }, [])
  return useApi(apiCall)
}

// Hook para estadísticas
export const useEstadisticas = () => {
  const apiCall = useCallback(() => ApiService.getEstadisticas(), [])
  return useApi(apiCall)
}

// Agregar hook para estados de equipo
export const useEstadosEquipo = () => {
  const apiCall = useCallback(async () => {
    const result = await ApiService.getEstadosEquipo()
    return Array.isArray(result) ? result : []
  }, [])
  return useApi(apiCall)
}
