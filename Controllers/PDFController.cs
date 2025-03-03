using Administrador_de_Plantillas.Services;
using HandlebarsDotNet;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Administrador_de_Plantillas.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PDFController : ControllerBase
    {
        private readonly PlantillaService _plantillaService;
        private readonly PDFService _pdfService;

        public PDFController(PlantillaService plantillaService, PDFService pdfService)
        {
            _plantillaService = plantillaService;
            _pdfService = pdfService;
        }

        [HttpPost("{id}", Name = "GenerarPDF")]
        public async Task<IActionResult> GenerarPdf(string id, [FromBody] Dictionary<string, JsonElement> datos)
        {
            foreach (var key in datos.Keys)
            {
                Console.WriteLine($"Clave: {key}, Tipo: {datos[key].ValueKind}");
            }

            var plantilla = await _plantillaService.GetByIdAsync(id);
            if (plantilla == null)
            {
                return NotFound("La plantilla no existe.");
            }

            // Convertir JsonElement a tipos adecuados
            var datosProcesados = new Dictionary<string, object>();

            foreach (var kvp in datos)
            {
                if (kvp.Value.ValueKind == JsonValueKind.String)
                {
                    datosProcesados[kvp.Key] = kvp.Value.GetString();
                }
                else if (kvp.Value.ValueKind == JsonValueKind.Number)
                {
                    datosProcesados[kvp.Key] = kvp.Value.GetDouble();
                }
                else if (kvp.Value.ValueKind == JsonValueKind.Array)
                {
                    datosProcesados[kvp.Key] = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(kvp.Value.GetRawText());
                }
                else
                {
                    datosProcesados[kvp.Key] = kvp.Value.GetRawText(); // Última opción, como string JSON
                }
            }

            Console.WriteLine();
            foreach (var key in datosProcesados.Keys)
            {
                Console.WriteLine($"Clave: {key}, Tipo: {datosProcesados[key]?.GetType()}");
            }

            var template = Handlebars.Compile(plantilla.CuerpoHTML);
            var htmlprocesado = template(datosProcesados);

            // Eliminar espacios en blanco, saltos de línea, tabulaciones y retornos de carro
            htmlprocesado = htmlprocesado.Replace("\n", "").Replace("\t", "").Replace("\r", "").Trim();

            System.Console.WriteLine("HTML Procesado:");
            System.Console.WriteLine(htmlprocesado);

            byte[] pdf = await _pdfService.GenerarPDF(htmlprocesado);
            return File(pdf, "application/pdf", $"{plantilla.NombrePlantilla}.pdf");
        }
    }
}
