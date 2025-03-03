import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Plantillas from "./pages/Plantillas";
import CrearPlantilla from "./pages/CrearPlantilla";
import EditarPlantilla from "./pages/EditarPlantilla";
import GenerarPDF from "./pages/GenerarPDF";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/plantillas" element={<Plantillas />} />
                <Route path="/crear-plantilla" element={<CrearPlantilla />} />
                <Route path="/editar-plantilla/:id" element={<EditarPlantilla />} />
                <Route path="/generar-pdf/:id" element={<GenerarPDF />} />
            </Routes>
        </Router>
    );
}
