namespace Administrador_de_Plantillas.Models
{
    public class GenerarPdfRequest
    {
        public string IdPlantilla { get; set; } = string.Empty;
        public Dictionary<string, string> Datos { get; set; } = new Dictionary<string, string>();
    }
}
