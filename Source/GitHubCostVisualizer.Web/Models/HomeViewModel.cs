using Microsoft.AspNetCore.Http;

namespace GitHubCostVisualizer.Web.Models
{
    public class HomeViewModel
    {
        public IFormFile UploadFile { get; set; }
    }
}