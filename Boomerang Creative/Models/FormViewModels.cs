using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Models
{
    public class ContactFormViewModel
    {
        [Required]
        public string Name { get; set; }
        public string Company { get; set; }
        [Required]
        [Display(Name = "Telephone")]
        public string Tel { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [Display(Name = "Message")]
        public string Message { get; set; }
        [Required]
        [Display(Name = "Please add me to your mailing list")]
        public bool Maillist { get; set; }
        public string gDPREmailMessage { get; set; }
        public string successMessage { get; set; }
        public IHtmlString mailChimpSignup { get; set; }
    }

	public class SelectedModel
	{
		public string Name { get; set; }
		public bool Checked { get; set; }
	}


	public class NewStartFormViewModel
    {
		public string FormTitle { get; set; }
		public string TitleTooltip { get; set; }
		public int Budget { get; set; }
		public bool PhoneCheck { get; set; }
		public bool EmailCheck { get; set; }
		public string BudgetTooltip { get; set; }
		public string ProjectDetailsTooltip { get; set; }
		public string ContactMeTooltip { get; set; }
		public List<SelectedModel> DesignList { get; set; }
		public List<SelectedModel> DevelopmentList { get; set; }
		public List<SelectedModel> MarketingContentList { get; set; }
		[Required]
		public string Name { get; set; }
        public string Company { get; set; }
        public string Role { get; set; }
        [Required]
        [Display(Name = "Telephone")]
        public string Tel { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [Display(Name = "Message")]
        public string Message { get; set; }
        [Required]
        [Display(Name = "Please add me to your mailing list")]
        public bool Maillist { get; set; }
        public string gDPREmailMessage { get; set; }
        public string successMessage { get; set; }
        public IHtmlString mailChimpSignup { get; set; }
    }
}