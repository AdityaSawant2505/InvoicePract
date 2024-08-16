using InvoicePract.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InvoicePract.Controllers
{
    public class CustomerController : Controller
    {
        InventryDbEntities db;

        public CustomerController()
        {
            db = new InventryDbEntities();
        }
        // GET: Customer
        public ActionResult C_Index()
        {
            List<tblcustomer> lst = db.tblcustomers.ToList();
            return View(lst);
        }
    }
}