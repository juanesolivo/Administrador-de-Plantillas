using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Administrador_de_Plantillas.Models
{
    public class Plantilla
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get;  set; }

        [BsonElement("NombrePlantilla")]
        public string NombrePlantilla { get; set; }

        [BsonElement("CuerpoHTML")]
        public string CuerpoHTML { get; set; }

        [BsonElement("Variables")]
        public List<string> Variables { get; set; } = new List<string>();
    }
}
