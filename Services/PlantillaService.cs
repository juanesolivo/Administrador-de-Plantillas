using Administrador_de_Plantillas.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Administrador_de_Plantillas.Services
{
    
    public class PlantillaService
    {
        private readonly IMongoCollection<Plantilla> _plantillasCollection;

        public PlantillaService(IConfiguration config) {
        
        var client = new MongoClient(config["mongodb:ConnectionString"]);
        var database = client.GetDatabase(config["mongodb:DatabaseName"]);
        _plantillasCollection = database.GetCollection<Plantilla>("Plantillas");
        }

        public async Task<List<Plantilla>> GetAsync() =>
            await _plantillasCollection.Find(_ => true).ToListAsync();

        public async Task<Plantilla> GetByIdAsync(string id) =>
            await _plantillasCollection.Find(p => p.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Plantilla plantilla) =>
            await _plantillasCollection.InsertOneAsync(plantilla);
    }
}
