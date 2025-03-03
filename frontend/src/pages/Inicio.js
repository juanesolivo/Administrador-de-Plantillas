import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="container p-4">
      <div className="text-center mb-5">
        <h1 className="page-title">Administrador de Plantillas PDF</h1>
        <p className="page-subtitle">
          Crea, gestiona y genera documentos PDF a partir de plantillas HTML personalizadas.
        </p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card feature-card">
            <div className="card-body">
              <h3 className="card-title">Ver Plantillas</h3>
              <p>
                Accede a todas tus plantillas guardadas. Visualiza, edita o elimina tus plantillas existentes. También
                puedes generar PDFs a partir de cualquier plantilla.
              </p>
              <Link to="/plantillas" className="btn btn-primary mt-3">
                Ver Plantillas
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card feature-card">
            <div className="card-body">
              <h3 className="card-title">Crear Plantilla</h3>
              <p>
                Crea plantillas HTML con variables personalizadas que luego podrás rellenar para generar documentos PDF.
                Usa variables entre llaves dobles &#123;&#123;variable&#125;&#125; para personalizar tus documentos.
              </p>
              <Link to="/crear-plantilla" className="btn btn-primary mt-3">
                Crear Nueva Plantilla
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

