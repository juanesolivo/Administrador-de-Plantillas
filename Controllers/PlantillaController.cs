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

        [HttpGet(Name = "GetPlantilla")]
        public async Task<IActionResult> Get()
        {
            var plantillas = await _plantillaService.GetAsync();
            return Ok(plantillas.ToList());
        }

        [HttpGet("{id}", Name = "GetPlantillaById")]
        public async Task<IActionResult> Get(string id)
        {
            var plantilla = await _plantillaService.GetByIdAsync(id);
            if (plantilla == null)
            {
                return NotFound();
            }
            return Ok(plantilla);
        }

        [HttpPost(Name = "PostPlantilla")]
        public async Task<IActionResult> Post([FromBody] Plantilla plantilla)
        {
            plantilla.Id = null;
            await _plantillaService.CreateAsync(plantilla);
            return Ok($"Plantilla creada: {plantilla.NombrePlantilla} \n{plantilla.CuerpoHTML}");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Plantilla plantilla)
        {
            var plantillaActual = await _plantillaService.GetByIdAsync(id);
            if (plantillaActual == null)
            {
                return NotFound();
            }
            plantilla.Id = id;
            await _plantillaService.UpdateAsync(id, plantilla);
            return Ok($"Plantilla {plantillaActual.NombrePlantilla} actualizada a: {plantilla.NombrePlantilla} \n{plantilla.CuerpoHTML}");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var plantilla = await _plantillaService.GetByIdAsync(id);
            if (plantilla == null)
            {
                return NotFound($"No se encontro la plantilla con el id {id}");
            }
            await _plantillaService.RemoveAsync(plantilla.Id);
            return Ok($"Plantilla {plantilla.NombrePlantilla} eliminada");
        }
    }
}
