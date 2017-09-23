using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PruebaFactura.Controllers
{
    [Route("api/demo/[controller]")]
    public class FacturaController : Controller
    {
        [HttpGet("[action]/{cantidad:int}")]
        public IActionResult Imprimir(int cantidad)
        {
            return Ok();
        }        
    }
}
