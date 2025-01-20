using Microsoft.AspNetCore.Mvc;

namespace PinWebComponent.Controllers
{
    public class PinController : Controller
    {
        public IActionResult CreateComp()
        {
            return View();
        }

        public IActionResult GetComp()
        {
            return View();
        }
    }
}
