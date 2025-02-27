using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Administrador_de_Plantillas.Models;
using Administrador_de_Plantillas.Services;


namespace Administrador_de_Plantillas.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlantillaController : ControllerBase
    {
        private readonly PlantillaService _plantillaService;

        public PlantillaController(PlantillaService plantillaService)
        {
            _plantillaService = plantillaService;
        }
        /*
        public static List<Plantilla> Plantillas = new List<Plantilla>
    {
        new Plantilla { CuerpoHTML="a",NombrePlantilla="Plantilla1"},
        new Plantilla { CuerpoHTML="b",NombrePlantilla="Plantilla2"},
        new Plantilla { CuerpoHTML="c",NombrePlantilla="Plantilla3"}
    };*/

        [HttpGet(Name = "GetPlantilla")]
        public async Task<IActionResult> Get()
        {
            var plantillas = await _plantillaService.GetAsync();
            return Ok(plantillas.ToList());
        }

        [HttpPost(Name = "PostPlantilla")]
        public async Task<IActionResult> Post([FromBody] Plantilla plantilla)
        {
            await _plantillaService.CreateAsync(plantilla);
            return Ok($"Plantilla creada: {plantilla.NombrePlantilla} \n{plantilla.CuerpoHTML}");
        }

        
        
    }
}
