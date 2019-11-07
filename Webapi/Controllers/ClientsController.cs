using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SPFX.Models;

namespace SPFX.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ClientsController : Controller
    {
        private readonly SPFX.Repo.AdventureWorksContext _context;
    //    public IActionResult Index()
    //    {
    //        return View();
    //    }
    public ClientsController(SPFX.Repo.AdventureWorksContext context)
    {
_context = context;

    }
        public IActionResult Privacy()
        {
            return View();
        }

        [AllowAnonymous]
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpGet]
        public dynamic Index()
        {
             List<Product> pros = new List<Product>();
             pros = _context.Product.ToList();

            var clients = new List<dynamic>
            {
                new
                {
                    Name = "Tim Perez"
                },
                new
                {
                    Name = "John Smith"
                }
            };

            return pros;
        }

        [HttpPost]
        public object PostData(object data)
        {
           
            return new
            {
                message = "data was successfully posted!"
            };
        }
    }
}
