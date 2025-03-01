using Administrador_de_Plantillas.Services;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> GenerarPdf(string id,[FromBody] Dictionary<string, string> datos)
        {
            var plantilla = await _plantillaService.GetByIdAsync(id);
            if (plantilla == null)
            {
                return NotFound("La plantilla no existe.");
            }

            var html = plantilla.CuerpoHTML;
            foreach (var variable in plantilla.Variables)
            {
                if (datos.TryGetValue(variable, out var valor))
                {
                    html = html.Replace($"{{{{{variable}}}}}", valor);
                }
            }
            byte[] pdf = await _pdfService.GenerarPDF(html);
            return File(pdf, "application/pdf",$"{plantilla.NombrePlantilla}.pdf");
        }
    }
}
