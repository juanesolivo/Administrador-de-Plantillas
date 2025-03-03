---

# Administrador de Plantillas PDF

Este proyecto es una aplicación web para crear, gestionar y generar documentos PDF a partir de plantillas HTML personalizadas. Utiliza una arquitectura de frontend y backend, donde el frontend está construido con React y el backend con ASP.NET Core.

## Estructura del Proyecto

```
.gitattributes
.gitignore
.vs/
Administrador-de-Plantillas.csproj
Administrador-de-Plantillas.csproj.user
Administrador-de-Plantillas.http
Administrador-de-Plantillas.sln
appsettings.Development.json
appsettings.json
bin/
Controllers/
frontend/
LICENSE.txt
Models/
obj/
Program.cs
Properties/
Services/
```

### Descripción de Carpetas y Archivos

- **.vs/**: Archivos de configuración de Visual Studio.
- **bin/**: Archivos binarios generados durante la compilación.
- **Controllers/**: Controladores de la API.
- **frontend/**: Código del frontend construido con React.
- **Models/**: Modelos de datos utilizados en la aplicación.
- **obj/**: Archivos de objetos generados durante la compilación.
- **Properties/**: Archivos de configuración del proyecto.
- **Services/**: Servicios utilizados por la aplicación.
- **Administrador-de-Plantillas.csproj**: Archivo de proyecto de Visual Studio.
- **Administrador-de-Plantillas.sln**: Archivo de solución de Visual Studio.
- **appsettings.Development.json**: Configuración de la aplicación para el entorno de desarrollo.
- **appsettings.json**: Configuración general de la aplicación.
- **Program.cs**: Punto de entrada de la aplicación.

## Requisitos

- .NET 8.0 SDK
- Node.js y npm
- MongoDB

## Configuración

### Backend

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/Administrador-de-Plantillas.git
   cd Administrador-de-Plantillas
   ```

2. Configura la cadena de conexión a MongoDB en appsettings.json:
   ```json
   {
     "Logging": {
       "LogLevel": {
         "Default": "Information",
         "Microsoft.AspNetCore": "Warning"
       }
     },
     "AllowedHosts": "*",
     "MongoDB": {
       "ConnectionString": "mongodb://localhost:27017",
       "DatabaseName": "AdministradorPlantillas"
     }
   }
   ```
3. Asegúrate de que MongoDB esté instalado y en ejecución en tu máquina. Puedes descargar MongoDB desde aquí.
4. Restaura las dependencias y ejecuta el proyecto:
   ```sh
   dotnet restore
   dotnet run
   ```

### Frontend

1. Navega al directorio frontend:
   ```sh
   cd frontend
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Inicia la aplicación:
   ```sh
   npm start
   ```

## Uso

### Crear Plantilla

1. Navega a `http://localhost:3000/crear-plantilla`.
2. Completa el formulario con el nombre de la plantilla y el cuerpo HTML.
3. Sigue las instrucciones para definir variables y arrays en el HTML.
4. Guarda la plantilla.

### Editar Plantilla

1. Navega a `http://localhost:3000/plantillas`.
2. Selecciona la plantilla que deseas editar.
3. Realiza los cambios necesarios y guarda la plantilla.

### Generar PDF

1. Navega a `http://localhost:3000/plantillas`.
2. Selecciona la plantilla para la cual deseas generar un PDF.
3. Completa las variables requeridas.
4. Genera y descarga el PDF.

## Estructura del Código

### Backend

- **Controllers/PDFController.cs**: Controlador para generar PDFs.
- **Controllers/PlantillaController.cs**: Controlador para gestionar plantillas.
- **Models/Plantilla.cs**: Modelo de datos para las plantillas.
- **Services/PDFService.cs**: Servicio para generar PDFs.
- **Services/PlantillaService.cs**: Servicio para gestionar plantillas.

### Frontend

- **src/components/**: Componentes reutilizables de React.
- **src/pages/**: Páginas principales de la aplicación.
- **src/styles.css**: Estilos CSS globales.

## Contribuir

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE.txt para más detalles.

---