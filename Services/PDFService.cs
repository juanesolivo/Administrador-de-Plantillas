using PuppeteerSharp.Media;
using PuppeteerSharp;


namespace Administrador_de_Plantillas.Services
{
    public class PDFService
    {
        public async Task<byte[]> GenerarPDF(string html)
        {
            // Descargar Chromium si no está disponible
            await new BrowserFetcher().DownloadAsync();

            await using var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true });
            await using var page = await browser.NewPageAsync();

            // Cargar el HTML en el navegador
            await page.SetContentAsync(html, new NavigationOptions { WaitUntil = new[] { WaitUntilNavigation.Networkidle0 } });

            // Asegurarse de que el contenido se renderiza correctamente
            await page.EmulateMediaTypeAsync(MediaType.Screen);

            // Generar el PDF con formato A4
            var pdfOptions = new PdfOptions
            {
                Format = PaperFormat.A4,
                PrintBackground = true
            };

            return await page.PdfDataAsync(pdfOptions);
        }
    }
}
