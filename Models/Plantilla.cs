using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Administrador_de_Plantillas.Models
{
    public class Plantilla
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; private set; }

        [BsonElement("NombrePlantilla")]
        public string NombrePlantilla { get; set; }

        [BsonElement("CuerpoHTML")]
        public string CuerpoHTML { get; set; }
    }
}
