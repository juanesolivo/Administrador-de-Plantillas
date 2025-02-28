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

        public async Task UpdateAsync(string id, Plantilla plantilla) =>
            await _plantillasCollection.ReplaceOneAsync(p => p.Id == id, plantilla);

        public async Task RemoveAsync(string? id)
        {
            await _plantillasCollection.DeleteOneAsync(p => p.Id == id);
        }
    }
}
