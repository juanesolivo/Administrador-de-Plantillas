import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://localhost:7188/plantilla";

export default function Plantillas() {
    const [plantillas, setPlantillas] = useState([]);

    useEffect(() => {
        axios.get(API_URL)
            .then((res) => setPlantillas(res.data))
            .catch((err) => console.error("Error cargando plantillas", err));
    }, []);

    return (
        <div>
            <h2>Plantillas Guardadas</h2>
            <ul>
                {plantillas.map((p) => (
                    <li key={p.id}>{p.nombrePlantilla}</li>
                ))}
            </ul>
        </div>
    );
}
