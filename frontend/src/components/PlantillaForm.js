import { useState } from "react";
import axios from "axios";

export default function PlantillaForm({ onSave, initialData }) {
    const [nombre, setNombre] = useState(initialData?.nombrePlantilla || "");
    const [cuerpoHTML, setCuerpoHTML] = useState(initialData?.cuerpoHTML || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://localhost:7188/plantilla", { nombrePlantilla: nombre, cuerpoHTML })
            .then((res) => {
                onSave();
            })
            .catch((err) => console.error("Error guardando plantilla", err));
    };

    return (
        <div className="card">
            <div className="card-body">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="nombre">Nombre de la Plantilla</label>
            <input
                type="text"
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
                value={cuerpoHTML}
                onChange={(e) => setCuerpoHTML(e.target.value)}
                placeholder="Escribe aquí tu HTML con variables entre llaves dobles {{variable}}"
                required
                className="form-control"
                rows="10"
            />

            <small className="text-muted">
              Usa variable entre llaves dobles para definir variables que se reemplazarán al generar el PDF.
            </small>
          </div>

          <div className="text-right">
            <button type="submit" className="btn btn-primary">
              {initialData ? "Actualizar" : "Guardar"} Plantilla
            </button>
          </div>
        </form>
        </div>
    </div>
    );
}