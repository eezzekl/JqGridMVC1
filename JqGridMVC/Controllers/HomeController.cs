using System;
using System.Linq;
using System.Web;
using Model;
using System.Web.Mvc;
using System.Collections.Generic;
using System.Collections;
using System.Web.Script.Serialization;
using System.Data.Entity;

namespace JqGridMVC.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        // GET: Home/Details/5
        public ActionResult Details(int id)
        {
            ViewBag.id = id;
            return View();
        }

        [HttpGet]
        public JsonResult GetAll(string sidx, string sord, int page, int rows)
        {
            var lst = new List<Alumno>();
            using (var context = new TestEntities())
            {
                lst = context.Alumnoes.ToList();
            }

            int totalrecords = lst.Count();
            var totalPages = (int)Math.Ceiling((float)totalrecords / (float)rows);
            var json = new
            {
                total = totalPages,
                page,
                records = totalrecords,
                rows = lst
            };
            return Json(json,JsonRequestBehavior.AllowGet);
        }

        public JsonResult Get(int id)
        {
            var al = new Alumno();
            using (var db = new TestEntities())
            {
                al = db.Alumnoes.Where(a => a.id == id).FirstOrDefault();
            }
            var json = new
            {
                response = al
            };
            return Json(json, JsonRequestBehavior.AllowGet);
        }

        // POST: Home/Create
        [HttpPost]
        public string Create([Bind(Exclude = "id")] Alumno alumno)
        {
            string message;
            try
            {
                if (ModelState.IsValid)
                {
                    using (var dbcontext = new TestEntities())
                    {
                        dbcontext.Alumnoes.Add(alumno);
                        dbcontext.SaveChanges();
                        message = "Guardado Correcto";
                    }
                }
                else
                    message = "Datos Incorrectos";
            }
            catch(Exception ex)
            {
                message =  $"Ha ocurrido un error \n{ex.Message}";
            }
            return message;
        }
        
        
        public string Edit(Alumno alumno)
        {
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    using(var db = new TestEntities())
                    {
                        db.Entry(alumno).State = EntityState.Modified;
                        db.SaveChanges();
                        msg = "Saved Successfully";
                    }
                }
                else
                    msg = "Validation data not successfull";
            }
            catch (Exception ex) {
                msg = "Error occured:" + ex.Message;
            }
            return msg;
        }
        
        
        public string Delete(int id)
        {
            using (var db = new TestEntities())
            {
                var al = db.Alumnoes.Where(a => a.id == id).FirstOrDefault();
                db.Alumnoes.Remove(al);
                db.SaveChanges();
                return "Deleted successfully";
            }
        }
    }
}
