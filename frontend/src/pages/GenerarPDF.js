"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import VariableInput from "../components/VariableInput"

const API_URL = "https://localhost:7188/pdf"

export default function GenerarPDF() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [plantilla, setPlantilla] = useState(null)
  const [variables, setVariables] = useState({})
  const [arrayVariables, setArrayVariables] = useState([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`https://localhost:7188/plantilla/${id}`)
      .then((res) => {
        console.log("Plantilla obtenida:", res.data)
        setPlantilla(res.data)
        const initialVariables = {}
        const initialArrayVariables = []
        let isArray = false
        res.data.variables.forEach((variable) => {
          if (variable.startsWith("#each")) {
            isArray = true
            initialArrayVariables.push(variable.replace("#each ", ""))
          } else if (variable === "/each") {
            isArray = false
          } else if (isArray) {
            if (!initialVariables[initialArrayVariables[initialArrayVariables.length - 1]]) {
              initialVariables[initialArrayVariables[initialArrayVariables.length - 1]] = [{}]
            }
            initialVariables[initialArrayVariables[initialArrayVariables.length - 1]][0][variable] = ""
          } else {
            initialVariables[variable] = ""
          }
        })
        setVariables(initialVariables)
        setArrayVariables(initialArrayVariables)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error cargando plantilla", err)
        setError("No se pudo cargar la plantilla. Por favor, intenta de nuevo.")
        setLoading(false)
      })
  }, [id])

  const handleChange = (variable, value) => {
    setVariables({
      ...variables,
      [variable]: value,
    })
  }

  const handleArrayChange = (arrayVariable, index, field, value) => {
    const updatedArray = [...variables[arrayVariable]]
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value,
    }
    setVariables({
      ...variables,
      [arrayVariable]: updatedArray,
    })
  }

  const addArrayItem = (arrayVariable) => {
    const newItem = {}
    Object.keys(variables[arrayVariable][0]).forEach((field) => {
      newItem[field] = ""
    })
    setVariables({
      ...variables,
      [arrayVariable]: [...variables[arrayVariable], newItem],
    })
  }

  const removeArrayItem = (arrayVariable, index) => {
    if (variables[arrayVariable].length > 1) {
      const updatedArray = [...variables[arrayVariable]]
      updatedArray.splice(index, 1)
      setVariables({
        ...variables,
        [arrayVariable]: updatedArray,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setGenerating(true)
    console.log("Datos enviados:", variables)

    axios
      .post(`${API_URL}/${id}`, variables, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `${plantilla.nombrePlantilla}.pdf`)
        document.body.appendChild(link)
        link.click()
        setGenerating(false)
        alert("PDF generado y descargado correctamente")
      })
      .catch((err) => {
        console.error("Error generando PDF", err)
        setGenerating(false)
        alert("Error al generar el PDF. Por favor, intenta de nuevo.")
      })
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

        <div className="alert alert-danger mt-3">{error}</div>
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
        <h1 className="page-title">Generar PDF</h1>
        <p className="page-subtitle">Completa las variables para la plantilla "{plantilla.nombrePlantilla}"</p>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {Object.keys(variables).length === 0 ? (
              <p className="text-center p-4 text-muted">Esta plantilla no tiene variables definidas.</p>
            ) : (
              <>
                {Object.keys(variables).map((variable) =>
                  arrayVariables.includes(variable) ? (
                    <div key={variable} className="variable-container mb-4">
                      <h3 className="mb-3" style={{ textTransform: "capitalize" }}>
                        {variable}
                      </h3>

                      {variables[variable].map((item, index) => (
                        <div key={index} className="variable-item">
                          <div className="d-flex justify-content-between mb-2">
                            <h5>Item {index + 1}</h5>
                            {variables[variable].length > 1 && (
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => removeArrayItem(variable, index)}
                              >
                                Eliminar
                              </button>
                            )}
                          </div>

                          {Object.keys(item).map((field) => (
                            <VariableInput
                              key={field}
                              variable={field}
                              value={item[field]}
                              onChange={(value) => handleArrayChange(variable, index, field, value)}
                            />
                          ))}
                        </div>
                      ))}

                      <button
                        type="button"
                        className="btn btn-secondary btn-sm mt-3"
                        onClick={() => addArrayItem(variable)}
                      >
                        Agregar {variable}
                      </button>
                    </div>
                  ) : (
                    <VariableInput
                      key={variable}
                      variable={variable}
                      value={variables[variable]}
                      onChange={(value) => handleChange(variable, value)}
                    />
                  ),
                )}
              </>
            )}

            <div className="text-right mt-4">
              <button type="submit" className="btn btn-primary" disabled={generating}>
                {generating ? (
                  <>
                    <span className="spinner spinner-sm mr-2"></span>
                    Generando...
                  </>
                ) : (
                  "Generar PDF"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

