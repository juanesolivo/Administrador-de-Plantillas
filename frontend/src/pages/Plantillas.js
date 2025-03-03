"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import PlantillaItem from "../components/PlantillaItem"

const API_URL = "https://localhost:7188/plantilla"

export default function Plantillas() {
  const [plantillas, setPlantillas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadPlantillas()
  }, [])

  const loadPlantillas = () => {
    setLoading(true)
    axios
      .get(API_URL)
      .then((res) => {
        setPlantillas(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error cargando plantillas", err)
        setError("No se pudieron cargar las plantillas. Por favor, intenta de nuevo más tarde.")
        setLoading(false)
      })
  }

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta plantilla?")) {
      axios
        .delete(`${API_URL}/${id}`)
        .then(() => {
          setPlantillas(plantillas.filter((p) => p.id !== id))
          alert("Plantilla eliminada correctamente")
        })
        .catch((err) => {
          console.error("Error eliminando plantilla", err)
          alert("Error al eliminar la plantilla")
        })
    }
  }

  const handleGeneratePDF = (id) => {
    navigate(`/generar-pdf/${id}`)
  }

  if (loading) {
    return (
      <div className="container p-4">
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="mt-3">Cargando plantillas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="page-title">Plantillas</h1>
          <p className="page-subtitle">Gestiona tus plantillas HTML para generar documentos PDF</p>
        </div>
        <button onClick={() => navigate("/crear-plantilla")} className="btn btn-primary">
          Crear Nueva Plantilla
        </button>
      </div>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      {plantillas.length === 0 && !error ? (
        <div className="empty-state">
          <h3>No hay plantillas</h3>
          <p className="mb-4">Aún no has creado ninguna plantilla. ¡Comienza creando una!</p>
          <button onClick={() => navigate("/crear-plantilla")} className="btn btn-primary">
            Crear Primera Plantilla className="btn btn-primary"> Crear Primera Plantilla
          </button>
        </div>
      ) : (
        <div className="plantillas-container">
          {plantillas.map((p) => (
            <PlantillaItem
              key={p.id}
              plantilla={p}
              onEdit={(id) => navigate(`/editar-plantilla/${id}`)}
              onDelete={handleDelete}
              onGeneratePDF={handleGeneratePDF}
            />
          ))}
        </div>
      )}
    </div>
  )
}

