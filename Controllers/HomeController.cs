using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReactPoc.Models;

namespace ReactPoc.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var viewModel = new HomeViewModel {
                PageTitle = "Awesome React SPA",
                Routes = CmsService.GetMenuItems()
            };
            
            return View(model: viewModel);
        }

        private static class CmsService
        {
            public static List<MenuItem> GetMenuItems()
            {
                var menuItems = new [] {
                    MenuItem.CreateItem("Home", "/"),
                    MenuItem.CreateItem("Subpage", "/subpage"),
                    MenuItem.CreateItem("Sidebar", "/sidebar"),
                    MenuItem.CreateItem("Filter", "/filter")
                };
                return menuItems.ToList();
            }
        }
    }
}
