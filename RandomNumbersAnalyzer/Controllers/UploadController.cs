namespace RandomNumbersAnalyzer.Controllers
{
    using System;
    using System.IO;
    using System.Net.Http.Headers;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload(IFormFile file)
        {
            try
            {
                var folderName = Path.Combine("Resources", "Data");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                Directory.CreateDirectory(pathToSave);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    var path = fullPath.Replace(@"\", @"\\");

                    return this.Ok(new { path });
                }
                else
                {
                    return this.BadRequest();
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(500, "Internal server error");
            }
        }
    }
}