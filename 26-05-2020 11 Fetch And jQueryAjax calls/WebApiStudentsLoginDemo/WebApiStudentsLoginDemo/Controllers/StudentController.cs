using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApiStudentsLoginDemo.Models;

namespace WebApiStudentsLoginDemo.Controllers
{
    //[EnableCors( "*", "*", "*")]
    public class StudentController : ApiController
    {
        //[EnableCors( "*", "*", "*")]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(StudentsDB.GetAllStudents());
            }
            catch (Exception ex)
            {
                //return BadRequest(ex.Message);
                return BadRequest("could not get all the students!\n  -- " + ex.Message);
                //return Content(HttpStatusCode.BadRequest,ex);
            }
        }

        //opt1 - time efficient
        //[DisableCors]
        public Student Get(string email, string password)
        {
            return StudentsDB.GetStudentByEmailAndPassword(email, password);
        }
               
        //opt2 - less code
        //public Student Get(string email, string password)
        //{
        //    return StudentsDB.GetAllStudents()
        //        .SingleOrDefault(st => st.Email == email && st.Password == password);
        //}

        [Route(Name = "GetStudentById")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Student res = StudentsDB.GetStudentById(id);
                if (res == null)
                {
                    return Content(HttpStatusCode.NotFound, $"student with id= {id} was not found!");
                }
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[DisableCors]
        public IHttpActionResult Post([FromBody] Student val)
        {
            //return StudentsDB.GetStudentByEmailAndPassword(val.Email, val.Password);
            try
            {
                Student res =  StudentsDB.InsertStudentToDb(val);
                if (res ==null)
                {
                    return Content(HttpStatusCode.BadRequest, $"could not insert student {val.ToString()} or already exists !");
                }
                return Created(new Uri(Url.Link("GetStudentById" , new {id = res.ID })),res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public IHttpActionResult Delete(int id)
        {
            try
            {
                Student s = StudentsDB.GetStudentById(id);
                if (s != null)
                {
                    int res = StudentsDB.DeleteStudentById(id);
                    if (res == 1)
                    {
                        return Ok();
                    }
                    return Content(HttpStatusCode.BadRequest, $"student with id {id} exsits but could not be deleted!!!");
                }
                return Content(HttpStatusCode.NotFound, "student with id = " + id + " was not found to delete!!!");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public IHttpActionResult Put(Student student2Update)
        {
            try
            {
                Student s = StudentsDB.GetStudentById(student2Update.ID);
                if (s != null)
                {
                    int res = StudentsDB.UpdateStudent(student2Update);
                    if (res == 1)
                    {
                        return Ok();
                    }
                    return Content(HttpStatusCode.NotModified, $"student with id {student2Update.ID} exsits but could not be modified!!!");
                }
                return Content(HttpStatusCode.NotFound, "student with id = " + student2Update.ID + " was not found to update!!!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
