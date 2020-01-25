using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Web.Models;
using Umbraco.Web.PublishedModels;

namespace Boomerang_Creative.Models
{
    public class BlogViewModel : ContentModel
    {
        // Standard Model Pass Through
        public BlogViewModel(IPublishedContent content) : base(content) { }

        public string MetaTitle { get; set; }
        public string MetaOgTitle { get; set; }
        public IPublishedContent MetaOgImage { get; set; }
        public string MetaOgDecription { get; set; }
        public string MetaDescription { get; set; }
        public bool HideInMainNavigation { get; set; }
        public bool HideInFooterNavigation { get; set; }
        public string NavbarType { get; set; }
        public string PageUrl { get; set; }
        public string EmblemType { get; set; }
        public IHtmlString Subtext { get; set; }
        public string LargeText { get; set; }
        public IPublishedContent BannerImage { get; set; }
        public bool StaticTop { get; set; }
        public bool UmbracoNavHide { get; set; }

        // Custom properties here...
        public IEnumerable<BlogPost> BlogPosts { get; set; }
    }

    //public class BlogPostViewModel
    //{
    //    public string MetaTitle { get; set; }
    //    public string MetaOgTitle { get; set; }
    //    public IPublishedContent MetaOgImage { get; set; }
    //    public string MetaOgDecription { get; set; }
    //    public string MetaDescription { get; set; }
    //    public bool HideInMainNavigation { get; set; }
    //    public bool HideInFooterNavigation { get; set; }
    //    public bool StaticTop { get; set; }
    //    public string NavbarType { get; set; }
    //    public string EmblemType { get; set; }
    //    public string BlogTitle { get; set; }
    //    public IHtmlString BlogText { get; set; }
    //    public string BlogImage { get; set; }
    //    public DateTime BlogDate { get; set; }
    //    public string PageUrl { get; set; }
    //    public bool UmbracoNavHide { get; set; }
    //}

    public class BlogListViewModel
    {
        public IEnumerable<BlogPostViewModel> BlogPosts { get; set; }
    }



    public class BlogPostViewModel
    {
        public string BlogTitle { get; set; }
        public string BlogText { get; set; }
        public string BlogImage { get; set; }
        public DateTime BlogDate { get; set; }
        public string BlogCategory { get; set; }
        public string BlogUrl { get; set; }
    }

    public class BlogFilterModel
    {
        public string BlogCategory { get; set; }
        public int iLoaded { get; set; }
        public int iLoad { get; set; }
    }



    public class ProjectViewModel
    {
        public string ProjectTitle { get; set; }
        public string ProjectImage { get; set; }
        public string ProjectUrl { get; set; }
        public IEnumerable<string> ProjectCategory { get; set; }
        public string TextColor { get; set; }
        public string OverlayColor { get; set; }
    }

    public class ProjectFilterModel
    {
        public string WorkCategory { get; set; }
    }
}