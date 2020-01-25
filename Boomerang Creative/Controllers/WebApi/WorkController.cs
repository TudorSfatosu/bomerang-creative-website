using Boomerang_Creative.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web.Http;
using Umbraco.Web;
using Umbraco.Web.PublishedModels;
using Umbraco.Web.WebApi;

namespace Boomerang_Creative.Controllers
{
    public class WorkController : UmbracoApiController
    {

        public IEnumerable<ProjectViewModel> GetAllWork()
        {
            var workNode = Umbraco.Content(1378);
            var work = new Work(workNode);
            var projects = work.Children<ProjectPost>();
            var projectsList = new List<ProjectViewModel>();

            foreach (var item in projects)
            {
                projectsList.Add(new ProjectViewModel()
                {
                    ProjectTitle = item.Name,
                    ProjectImage = item.Image.Url,
                    ProjectUrl = item.Url,
                    ProjectCategory = item.PortfolioWorkCategory,
                    TextColor = item.TextColor,
                    OverlayColor = item.OverlayColor
                });
            }

            return projectsList;
        }

        [HttpPost]
        public string FilterProjects(ProjectFilterModel post)
        {
            var workNode = Umbraco.Content(1378);
            var work = new Work(workNode);
            var projects = work.Children<ProjectPost>();
            var projectsList = new List<ProjectViewModel>();

            string projectHtml = ProjectFormat(projects.Where(x => x.PortfolioWorkCategory.Contains(post.WorkCategory) || post.WorkCategory == "All Projects"));

            return !String.IsNullOrEmpty(projectHtml.ToString()) ? projectHtml.ToString() : String.Empty;
        }

        [HttpPost]
        public string LoadWork(ProjectFilterModel post)
        {
            var workNode = Umbraco.Content(1378);
            var work = new Work(workNode);
            var projects = work.Children<ProjectPost>();
            var projectsList = new List<ProjectViewModel>();

            string projectHtml = ProjectFormat(projects.Where(x => x.PortfolioWorkCategory.Contains(post.WorkCategory) || post.WorkCategory == "All Projects"));

            return !String.IsNullOrEmpty(projectHtml.ToString()) ? projectHtml.ToString() : String.Empty;
        }


        public string ProjectFormat(IEnumerable<ProjectPost> projects)
        {
            var sb = new StringBuilder();

            foreach (var item in projects)
            {
                sb.Append(String.Format("<a rel=\"canonical\" href=\"{0}\" class=\"col-12 col-md-6 img-col {1}-text {1}-text-hover \">", item.Url, item.TextColor));
                sb.Append(String.Format("<img src=\"{0}\" alt=\"{1}\">", item.Image.Url, Path.GetFileNameWithoutExtension(item.Image.Url).Replace("-", " ")));
                sb.Append(String.Format("<div class=\"overlay-effect {0}\"></div>", item.OverlayColor));
                sb.Append("<div class=\"caption-container\">");
                sb.Append(String.Format("<h3 class=\"museo-sans-300\">{0}</h3>", item.Name));
                sb.Append("</div>");
                sb.Append("</a>");
            }

            return !String.IsNullOrEmpty(sb.ToString()) ? sb.ToString() : String.Empty;
        }
    }
}