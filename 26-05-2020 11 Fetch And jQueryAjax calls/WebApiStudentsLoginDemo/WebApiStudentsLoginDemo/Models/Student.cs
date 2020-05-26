using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiStudentsLoginDemo.Models
{
    public class Student
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Grade { get; set; }

        public Student()
        {

        }
        public Student(int id,string name , string email, string password,int grade)
        {
            ID = id;Name = name; Email = email;Password = password;Grade = grade;
        }
        public override string ToString()
        {
            return $"{ID}, {Name}, {Email}, {Password}, {Grade}";
        }
    }
}