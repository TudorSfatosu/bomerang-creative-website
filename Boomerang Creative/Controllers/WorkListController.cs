using Boomerang_Creative.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Mvc;
using Umbraco.Web.Mvc;

namespace Boomerang_Creative.Controllers
{
    public class WorkListController : SurfaceController
    {
        // GET: BlogList
        public ActionResult Index()
        {
            IEnumerable<ProjectViewModel> projects = null;

            using (var client = new HttpClient())
            {
                string domainName = HttpContext.Request.Url.GetLeftPart(UriPartial.Authority);

                client.BaseAddress = new Uri(domainName + "/umbraco/api/work/");
                //HTTP GET
                var responseTask = client.GetAsync("GetAllWork/");
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<ProjectViewModel>>();
                    readTask.Wait();

                    projects = readTask.Result;

                    //var blogNode = Umbraco.Content(1381);
                    //var blog = new Blog(blogNode);
                    //blogModel.Blog = blog;

                }
                else //web api sent error response 
                {
                    //log response status here..

                    projects = Enumerable.Empty<ProjectViewModel>();

                    ModelState.AddModelError(string.Empty, "Server error. Please contact administrator.");
                }
            }

            return PartialView("~/Views/Partials/WorkList.cshtml", projects);
        }
    }
}