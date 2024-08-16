using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InvoicePract.Controllers
{
    public class InvoiceController : Controller
    {
        // GET: Invoice
        public ActionResult I_Index()
        {
            return View();
        }
    }
}