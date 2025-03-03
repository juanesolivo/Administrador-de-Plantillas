import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Plantillas from "./pages/Plantillas";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/plantillas" />} />
                <Route path="/plantillas" element={<Plantillas />} />
            </Routes>
        </Router>
    );
}
