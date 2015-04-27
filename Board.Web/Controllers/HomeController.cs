using System;
using System.Web;
using System.Web.Mvc;

namespace Board.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
