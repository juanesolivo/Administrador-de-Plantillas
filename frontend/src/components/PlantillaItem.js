export default function PlantillaItem({ plantilla, onEdit, onDelete, onGeneratePDF }) {
    return (
      <div className="plantilla-item">
        <div className="plantilla-name">{plantilla.nombrePlantilla}</div>
        <div className="plantilla-buttons">
          <button onClick={() => onEdit(plantilla.id)} className="btn btn-secondary btn-sm">
            Editar
          </button>
          <button onClick={() => onGeneratePDF(plantilla.id)} className="btn btn-primary btn-sm">
            Generar PDF
          </button>
          <button onClick={() => onDelete(plantilla.id)} className="btn btn-danger btn-sm">
            Eliminar
          </button>
        </div>
      </div>
    )
  }
  
  