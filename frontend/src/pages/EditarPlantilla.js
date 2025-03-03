"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = "https://localhost:7188/plantilla"

export default function EditarPlantilla() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nombre, setNombre] = useState("")
  const [cuerpoHTML, setCuerpoHTML] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        setNombre(res.data.nombrePlantilla)
        setCuerpoHTML(res.data.cuerpoHTML)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error cargando plantilla", err)
        setError("No se pudo cargar la plantilla. Por favor, intenta de nuevo.")
        setLoading(false)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`${API_URL}/${id}`, { nombrePlantilla: nombre, cuerpoHTML })
      .then(() => {
        alert("Plantilla actualizada correctamente")
        navigate("/plantillas")
      })
      .catch((err) => console.error("Error actualizando plantilla", err))
  }

  if (loading) {
    return (
      <div className="container p-4">
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="mt-3">Cargando plantilla...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container p-4">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            navigate("/plantillas")
          }}
          className="back-button"
        >
          Volver a Plantillas
        </a>
        <div className="alert alert-danger">{error}</div>
      </div>
    )
  }

  return (
    <div className="container p-4">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          navigate("/plantillas")
        }}
        className="back-button"
      >
        Volver a Plantillas
      </a>

      <div className="mb-4">
        <h1 className="page-title">Editar Plantilla</h1>
        <p className="page-subtitle">Modifica los detalles de tu plantilla HTML</p>
      </div>

      

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre de la Plantilla</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre de la Plantilla"
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cuerpoHTML">Cuerpo HTML</label>
              <textarea
                id="cuerpoHTML"
                value={cuerpoHTML}
                onChange={(e) => setCuerpoHTML(e.target.value)}
                placeholder="Cuerpo HTML"
                required
                className="form-control"
                rows="10"
              />
            </div>

            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                Actualizar
              </button>
            </div>
          </form>
          <div> <p></p></div>
          <div className="card mb-4">
        <div className="card-body">
          <h3>Instrucciones</h3>
          <p>
            <strong>1. HTML sin saltos de línea:</strong> Para evitar errores,
            asegúrate de que el HTML no contenga saltos de línea, tabulaciones
            o retornos de carro.
          </p>
          <p>
            <strong>2. Variables:</strong> Define las variables entre llaves
            dobles <code>{`{{variable}}`}</code>. Por ejemplo:{" "}
            <code>{`{{nombre}}`}</code>.
          </p>
          <p>
            <strong>3. Variables tipo array:</strong> Si deseas definir
            variables tipo array (una o más), utiliza la sintaxis{" "}
            <code>{`#each variable`}</code> como si fuera un bucle <code>for</code>.
            Por ejemplo:
          </p>
          <pre>
            <code>
              {`{{#each productos}}`}
              {"\n  <tr>"}
              {"\n    <td>{{nombre}}</td>"}
              {"\n    <td>{{cantidad}}</td>"}
              {"\n    <td>{{precio}}</td>"}
              {"\n  </tr>"}
              {"\n{{/each}}"}
            </code>
          </pre>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}

