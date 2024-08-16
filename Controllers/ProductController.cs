using InvoicePract.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InvoicePract.Controllers
{
    public class ProductController : Controller
    {
        InventryDbEntities db;

        public ProductController()
        {
            db = new InventryDbEntities();
        }
        public ActionResult P_Index()
        {
            return View();
        }

        [HttpPost]
        public string AddProduct(tblproduct tp)
        {
            db.tblproducts.Add(tp);
            db.SaveChanges();
            return "Product Addedd Successfully";
        }

        [HttpGet]
        public JsonResult GetProduct()
        {
            List<tblproduct> lst = db.tblproducts.ToList();
            return Json(lst,JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetProductBYId(int id)
        {
            tblproduct lst = GetAllProducts().FirstOrDefault(e => e.Product_id == id);
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public List<tblproduct> GetAllProducts()
        {
            List<tblproduct> lst = new List<tblproduct>();
            foreach (tblproduct p in db.tblproducts)
            {
                tblproduct pr = new tblproduct()
                {
                    Product_id = p.Product_id,
                    Product_name = p.Product_name,
                    Rate = p.Rate,
                    Tax = p.Tax,
                    Stock_quantity = p.Stock_quantity
                };
                lst.Add(pr);
               
            }

            return lst;
        }

        [HttpPost]
        public string UpdateProduct(tblproduct tp)
        {
            db.Entry<tblproduct>(tp).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return "Product Updated Successfully";
        }

        [HttpPost]
        public string DeleteProduct(int id)
        {
            tblproduct p = db.tblproducts.Find(id);
            db.tblproducts.Remove(p);
            db.SaveChanges();
            return "Product Deleted Successfully";
        }
    }
}