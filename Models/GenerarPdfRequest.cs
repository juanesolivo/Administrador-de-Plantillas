namespace Administrador_de_Plantillas.Models
{
    public class GenerarPdfRequest
    {
        public string IdPlantilla { get; set; } = string.Empty;
        public Dictionary<string, object> Datos { get; set; } = new Dictionary<string, object>();
    }
}
