using GitHubCostVisualizer.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using CsvHelper;
using GitHubCostVisualizer.Web.Processor;

namespace GitHubCostVisualizer.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IGithubUsageProcessor _processor; 

        public HomeController(ILogger<HomeController> logger, IGithubUsageProcessor processor)
        {
            _logger = logger;
            _processor = processor;
        }

        public IActionResult Index()
        {
            return View(new HomeViewModel());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Report(HomeViewModel data)
        {
            if (data.UploadFile == null)
            {
                ModelState.AddModelError(nameof(data.UploadFile), "You must supply an upload file");
                return View(nameof(Index), data);
            }

            try
            {
                using (var reader = new StreamReader(data.UploadFile.OpenReadStream()))
                using (var csvData = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    var rawReport = csvData.GetRecords<GithubUsageEntry>().ToList();
                    if (rawReport.Count == 0)
                    {
                        ModelState.AddModelError(nameof(data.UploadFile), "The uploaded file did not contain any records, please try with a different file.");
                        return View(nameof(Index), data);
                    }
                    var model = _processor.ProcessUsageReport(rawReport);
                    return View(model);
                }
            }
            catch (Exception)
            {
                ModelState.AddModelError(nameof(data.UploadFile), "Unable to process file, please ensure the file is un-modified from GitHub.");
                return View(nameof(Index), data);
            }
            
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
