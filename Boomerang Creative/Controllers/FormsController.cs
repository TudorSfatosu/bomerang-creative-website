using System;
using System.Web.Mvc;
using RestSharp;
using RestSharp.Authenticators;
using Umbraco.Web;
using Umbraco.Web.Mvc;
using Recaptcha.Web;
using Recaptcha.Web.Mvc;
using MailChimp.Net;
using MailChimp.Net.Models;
using MailChimp.Net.Core;
using System.Net;
using Models;
using Umbraco.Web.PublishedModels;
using Umbraco.Core.Services;
using System.Collections.Generic;
using System.Linq;

namespace Boomerang_Creative.Controllers
{
	public class FormsController : SurfaceController
	{
		// GET: ContactForm
		public ActionResult ContactForm()
		{
			var settings = Umbraco.Content(1473);
			var settingsNode = new Settings(settings);

			string gDPREmailMessage = settingsNode.GDpremailMessage;
			return PartialView("~/Views/Partials/ContactForm.cshtml", new ContactFormViewModel
			{
				gDPREmailMessage = gDPREmailMessage,
				successMessage = settingsNode.ContactSuccessMessage,
				mailChimpSignup = settingsNode.MailChimpSignup
			}
			);
		}



		[HttpPost]
		public async System.Threading.Tasks.Task<ActionResult> ContactFormSubmit(ContactFormViewModel model)
		{
			RecaptchaVerificationHelper recaptchaHelper = this.GetRecaptchaVerificationHelper();
			if (string.IsNullOrEmpty(recaptchaHelper.Response))
			{
				ViewBag.Section = "form";
				TempData["success"] = false;
				ModelState.AddModelError("reCAPTCHA", "Please complete the reCAPTCHA");
				return CurrentUmbracoPage();
			}
			else
			{
				RecaptchaVerificationResult recaptchaResult = recaptchaHelper.VerifyRecaptchaResponse();
				if (recaptchaResult != RecaptchaVerificationResult.Success)
				{
					ViewBag.Section = "form";
					TempData["success"] = false;
					ModelState.AddModelError("reCAPTCHA", "The reCAPTCHA is incorrect");
					return CurrentUmbracoPage();
				}
			}

			if (!ModelState.IsValid)
			{
				ViewBag.Section = "form";
				return CurrentUmbracoPage();
			}

			var settings = Umbraco.Content(1473);
			var settingsNode = new Settings(settings);

			// email
			string EmailTo = settingsNode.EmailTo;
			string EmailFrom = settingsNode.EmailFrom;
			string MailgunApiKey = settingsNode.MailgunApikey;
			string MailgunDomain = settingsNode.MailgunDomain;
			string MailChimpApiKey = settingsNode.MailChimpApikey;
			string MailChimpListId = settingsNode.MailChimpListId;



			string maillist = (model.Maillist == true ? "Yes" : "No");

			string subject = "New Contact Form Enquiry - " + DateTime.Now.ToString("dd/MM/yyyy HH:mm");
			string messageHead = "<head>" +
								"<style>" +
								"table { font-family:Arial, Helvetica, sans-serif; font-size:14px; } td, th { padding:6px; text-align:left; border-bottom:1px solid #dddddd; } th { font-weight: 700; }" +
								"</style>" +
								"</head>";
			string messageBody = "<body>" +
									"<table>" +
									"<tr><th>Name:</th><td>" + model.Name + "</td></tr>" +
									"<tr><th>Company:</th><td>" + model.Company + "</td></tr>" +
									"<tr><th>Email:</th><td>" + model.Email + "</td></tr>" +
									"<tr><th>Telephone:</th><td>" + model.Tel + "</td></tr>" +
									"<tr><th>Message:</th><td>" + model.Message + "</td></tr>" +
									"<tr><th>Added to mailing list:</th><td>" + maillist + "</td></tr>" +
									"</table>" +
									"</body>";
			string message = "<html>" + messageHead + messageBody + "</html>";
			RestClient client = new RestClient();
			client.BaseUrl = new Uri("https://api.eu.mailgun.net/v3");
			client.Authenticator =
					new HttpBasicAuthenticator("api", MailgunApiKey);
			RestRequest request = new RestRequest();
			request.AddParameter("domain", MailgunDomain, ParameterType.UrlSegment);
			request.Resource = "{domain}/messages";
			request.AddParameter("from", "Contact Form <" + EmailFrom + ">");
			request.AddParameter("to", EmailTo);
			//request.AddParameter("bcc", "james@boomerangcreative.agency");
			request.AddParameter("subject", subject);
			request.AddParameter("html", message);
			request.AddParameter("h:Reply-To", model.Email);
			request.Method = RestSharp.Method.POST;
			var response = client.Execute(request);

			TempData["success"] = true;


			if (model.Maillist == true)
			{
				// mailchimp code here
				var MailChimpManager = new MailChimpManager(MailChimpApiKey);

				// Use the Status property if updating an existing member
				var member = new MailChimp.Net.Models.Member
				{
					EmailAddress = model.Email,
					Status = Status.Pending,
					EmailType = "html",
					//TimestampSignup = DateTime.UtcNow.ToString("s")
				};

				member.MergeFields.Add("NAME", model.Name);

				try
				{
					var result = await MailChimpManager.Members.AddOrUpdateAsync(MailChimpListId, member);
					TempData["Message"] = new MvcHtmlString(settingsNode.MailChimpSignup.ToHtmlString());
				}
				catch (MailChimpException mce)
				{
					return new HttpStatusCodeResult(HttpStatusCode.BadGateway, mce.Message);
				}
				catch (Exception ex)
				{
					return new HttpStatusCodeResult(HttpStatusCode.ServiceUnavailable, ex.Message);
				}
			}

			//return RedirectToUmbracoPage(Convert.ToInt32(CurrentPage.GetProperty("thankYouRedirect").Value));
			//return RedirectToCurrentUmbracoPage();
			var url = Umbraco.Content(CurrentPage.Id).Url;
			return Redirect(url + "#form");
		}




		// GET: ContactForm
		public ActionResult NewStartForm()
		{
			var settings = Umbraco.Content(1473);
			var settingsNode = new Settings(settings);

			var newStart = Umbraco.Content(1380);
			var newStartNode = new NewStart(newStart);


			//Design list
			var DesignList = new List<SelectedModel>();
			foreach (var item in newStartNode.DesignList)
			{
				DesignList.Add(new SelectedModel
				{
					Checked = false,
					Name = item
				});
			}
			//Development list
			var DevelopmentList = new List<SelectedModel>();
			foreach (var item in newStartNode.DevelopmentList)
			{
				DevelopmentList.Add(new SelectedModel
				{
					Checked = false,
					Name = item
				});
			}
			//Marketing list
			var MarketingContentList = new List<SelectedModel>();
			foreach (var item in newStartNode.MarketingContentList)
			{
				MarketingContentList.Add(new SelectedModel
				{
					Checked = false,
					Name = item
				});
			}

			string gDPREmailMessage = settingsNode.GDpremailMessage;
			return PartialView("~/Views/Partials/NewStartForm.cshtml", new NewStartFormViewModel
			{
				gDPREmailMessage = gDPREmailMessage,
				successMessage = settingsNode.NewStartSuccessMessage,
				mailChimpSignup = settingsNode.MailChimpSignup,
				FormTitle = newStartNode.FormTitle,
				TitleTooltip = newStartNode.TitleTooltip,
				BudgetTooltip = newStartNode.BudgetTooltipText,
				ProjectDetailsTooltip = newStartNode.ProjectDetailsTooltip,
				ContactMeTooltip = newStartNode.ContactMeTooltip,
				DesignList = DesignList,
				DevelopmentList = DevelopmentList,
				MarketingContentList = MarketingContentList
			}
			);
		}



		[HttpPost]
		public async System.Threading.Tasks.Task<ActionResult> NewStartFormSubmit(NewStartFormViewModel model)
		{
			RecaptchaVerificationHelper recaptchaHelper = this.GetRecaptchaVerificationHelper();
			if (string.IsNullOrEmpty(recaptchaHelper.Response))
			{
				ViewBag.Section = "form";
				TempData["success"] = false;
				ModelState.AddModelError("reCAPTCHA", "Please complete the reCAPTCHA");
				return CurrentUmbracoPage();
			}
			else
			{
				RecaptchaVerificationResult recaptchaResult = recaptchaHelper.VerifyRecaptchaResponse();
				if (recaptchaResult != RecaptchaVerificationResult.Success)
				{
					ViewBag.Section = "form";
					TempData["success"] = false;
					ModelState.AddModelError("reCAPTCHA", "The reCAPTCHA is incorrect");
					return CurrentUmbracoPage();
				}
			}

			if (!ModelState.IsValid)
			{
				IEnumerable<ModelError> errors = ModelState.Values.SelectMany(v => v.Errors);
				ViewBag.Section = "form";
				return CurrentUmbracoPage();
			}

			var settings = Umbraco.Content(1473);
			var settingsNode = new Settings(settings);

			// email
			string EmailTo = settingsNode.EmailTo;
			string EmailFrom = settingsNode.EmailFrom;
			string MailgunApiKey = settingsNode.MailgunApikey;
			string MailgunDomain = settingsNode.MailgunDomain;
			string MailChimpApiKey = settingsNode.MailChimpApikey;
			string MailChimpListId = settingsNode.MailChimpListId;

			string maillist = (model.Maillist == true ? "Yes" : "No");
			string PhoneCheck = (model.PhoneCheck == true ? "Yes" : "No");
			string EmailCheck = (model.EmailCheck == true ? "Yes" : "No");

			string subject = "New Start Form Enquiry - " + DateTime.Now.ToString("dd/MM/yyyy HH:mm");
			string messageHead = "<head>" +
								"<style>" +
								"table { font-family:Arial, Helvetica, sans-serif; font-size:14px; } td, th { padding:6px; text-align:left; border-bottom:1px solid #dddddd; } th { font-weight: 700; }" +
								"</style>" +
								"</head>";
			string messageBody = "<body>" +
									"<table>" +
									"<tr><th>Name:</th><td>" + model.Name + "</td></tr>";
			if (model.Company != "")
			{
				messageBody += "<tr><th>Company:</th><td>" + model.Company + "</td></tr>";
			}
			if (model.Role != "")
			{
				messageBody += "<tr><th>Role:</th><td>" + model.Role + "</td></tr>";
			}

			messageBody += "<tr><th>Email:</th><td>" + model.Email + "</td></tr>" +
									"<tr><th>Telephone:</th><td>" + model.Tel + "</td></tr>" +
									"<tr><th>Message:</th><td>" + model.Message + "</td></tr>" +
									"<tr><th>Budget:</th><td>" + "£ " + model.Budget + "</td></tr>";
			foreach (var item in model.DesignList)
			{
				if (item.Checked) {
					messageBody += "<tr><th>Design:</th><td>" + item.Name + "</td></tr>";
				}
			}

			foreach (var item in model.DevelopmentList)
			{
				if (item.Checked)
				{
					messageBody += "<tr><th>Development:</th><td>" + item.Name + "</td></tr>";
				}
			}

			foreach (var item in model.MarketingContentList)
			{
				if (item.Checked)
				{
					messageBody += "<tr><th>Marketing:</th><td>" + item.Name + "</td></tr>";
				}
			}

			messageBody += "<tr><th>Phone contact:</th><td>" + PhoneCheck + "</td></tr>" +
									"<tr><th>Email contact:</th><td>" + EmailCheck + "</td></tr>" +
									"<tr><th>Added to mailing list:</th><td>" + maillist + "</td></tr>" +
									"</table>" +
									"</body>";
			string message = "<html>" + messageHead + messageBody + "</html>";
			RestClient client = new RestClient();
			client.BaseUrl = new Uri("https://api.eu.mailgun.net/v3");
			client.Authenticator =
					new HttpBasicAuthenticator("api", MailgunApiKey);
			RestRequest request = new RestRequest();
			request.AddParameter("domain", MailgunDomain, ParameterType.UrlSegment);
			request.Resource = "{domain}/messages";
			request.AddParameter("from", "Contact Form <" + EmailFrom + ">");
			request.AddParameter("to", EmailTo);
			//request.AddParameter("bcc", "james@boomerangcreative.agency");
			request.AddParameter("subject", subject);
			request.AddParameter("html", message);
			request.AddParameter("h:Reply-To", model.Email);
			request.Method = RestSharp.Method.POST;
			var response = client.Execute(request);

			TempData["success"] = true;


			if (model.Maillist == true)
			{
				// mailchimp code here
				var MailChimpManager = new MailChimpManager(MailChimpApiKey);

				// Use the Status property if updating an existing member
				var member = new MailChimp.Net.Models.Member
				{
					EmailAddress = model.Email,
					Status = Status.Pending,
					EmailType = "html",
					//TimestampSignup = DateTime.UtcNow.ToString("s")
				};

				member.MergeFields.Add("NAME", model.Name);

				try
				{
					var result = await MailChimpManager.Members.AddOrUpdateAsync(MailChimpListId, member);
					TempData["Message"] = new MvcHtmlString(settingsNode.MailChimpSignup.ToHtmlString());
				}
				catch (MailChimpException mce)
				{
					return new HttpStatusCodeResult(HttpStatusCode.BadGateway, mce.Message);
				}
				catch (Exception ex)
				{
					return new HttpStatusCodeResult(HttpStatusCode.ServiceUnavailable, ex.Message);
				}
			}

			//return RedirectToUmbracoPage(Convert.ToInt32(CurrentPage.GetProperty("thankYouRedirect").Value));
			//return RedirectToCurrentUmbracoPage();
			var url = Umbraco.Content(CurrentPage.Id).Url;
			return Redirect(url + "#form");
		}
	}
}