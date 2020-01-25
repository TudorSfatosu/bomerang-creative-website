using Boomerang_Creative.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;
using Umbraco.Web;
using Umbraco.Web.PublishedModels;
using Umbraco.Web.WebApi;

namespace Boomerang_Creative.Controllers.WebApi
{
    public class BlogController : UmbracoApiController
    {
		public IEnumerable<BlogPostViewModel> GetAllBlogs()
        {
            var blogNode = Umbraco.Content(1381);
            var blog = new Blog(blogNode);
            var blogs = blog.Children<BlogPost>().OrderByDescending(x => (DateTime)x.BlogDate);
            var blogList = new List<BlogPostViewModel>();

            foreach (var item in blogs.Take(5))
            {
                blogList.Add(new BlogPostViewModel()
                {
                    BlogTitle = item.BlogTitle,
                    BlogDate = item.BlogDate,
                    BlogText = item.BlogText.ToString(),
                    BlogImage = item.BlogImage.Src + item.BlogImage.GetCropUrl("Blog List Image"),
                    BlogCategory = item.BlogCategory,
                    BlogUrl = item.Url
                });
            }

            return blogList;
        }

        [HttpPost]
        public string FilterBlogs(BlogFilterModel post)
        {
            var blogNode = Umbraco.Content(1381);
            var blog = new Blog(blogNode);
            var blogs = blog.Children<BlogPost>();
            var blogList = new List<BlogPostViewModel>();

            string blogHtml = BlogFormat(blogs.Where(x => x.BlogCategory == post.BlogCategory || post.BlogCategory == "all").OrderByDescending(x => (DateTime)x.BlogDate).Take(post.iLoad));
            
            return !String.IsNullOrEmpty(blogHtml.ToString()) ? blogHtml.ToString() : String.Empty;
        }

        [HttpPost]
        public string LoadBlogs(BlogFilterModel post)
        {
            var blogNode = Umbraco.Content(1381);
            var blog = new Blog(blogNode);
            var blogs = blog.Children<BlogPost>();
            //var blogList = new List<BlogPostViewModel>();

            string blogHtml = BlogFormat(blogs.Where(x => x.BlogCategory == post.BlogCategory || post.BlogCategory == "all").OrderByDescending(x => (DateTime)x.BlogDate).Skip(post.iLoaded).Take(post.iLoad));

            return !String.IsNullOrEmpty(blogHtml.ToString()) ? blogHtml.ToString() : String.Empty;
        }


        public string BlogFormat(IEnumerable<BlogPost> blogs)
        {
            var sb = new StringBuilder();

            foreach (var item in blogs)
            {
                sb.Append("<div class=\"card mb-5\">");
                sb.Append(String.Format("<img class=\"card-img-top\" src=\"{0}\" alt=\"{1}\">", item.BlogImage.Src + item.BlogImage.GetCropUrl("Blog List Image"), item.BlogTitle + " image"));
                sb.Append("<div class=\"card-body\">");
                sb.Append("<p class=\"card-text\">" + item.BlogCategory + "</p>");                
                sb.Append("<h2 class=\"card-title\">" + item.BlogTitle + "</h2>");
                //sb.Append("<p class=\"card-text\">" + item.BlogText + "</p>");
                sb.Append(String.Format("<a rel=\"canonical\" href=\"{0}\" class=\"read-btn\">Continue Reading</a>", item.Url));
                sb.Append("<div class=\"text-muted\">Posted on " + item.BlogDate.ToString("MMMM d, yyyy") + "</div>");
                sb.Append("</div>");
                sb.Append("</div>");
            }

            return !String.IsNullOrEmpty(sb.ToString()) ? sb.ToString() : String.Empty;
        }

    }
}
