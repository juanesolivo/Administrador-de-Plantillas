import PlantillaForm from "../components/PlantillaForm";
import { useNavigate } from "react-router-dom";

export default function CrearPlantilla() {
  const navigate = useNavigate();

  const handleSave = () => {
    alert("Plantilla creada correctamente");
    navigate("/plantillas");
  };

  return (
    <div className="container p-4">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigate("/plantillas");
        }}
        className="back-button"
      >
        Volver a Plantillas
      </a>

      <div className="mb-4">
        <h1 className="page-title">Crear Nueva Plantilla</h1>
        <p className="page-subtitle">
          Diseña una plantilla HTML con variables para generar documentos PDF
        </p>
      </div>

      

      <PlantillaForm onSave={handleSave} />
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
            <code>#each variable</code> como si fuera un bucle <code>for</code>.
            Por ejemplo:
          </p>
          <pre>
            <code>
              {"{{#each productos}}"}
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
  );
}

