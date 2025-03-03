import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <div className="container d-flex justify-content-between align-items-center">
            <div className="navbar-brand">PDF Templates</div>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/plantillas">Plantillas</Link></li>
                <li><Link to="/crear-plantilla">Crear Plantilla</Link></li>
            </ul>
            </div>
        </nav>
    );
}