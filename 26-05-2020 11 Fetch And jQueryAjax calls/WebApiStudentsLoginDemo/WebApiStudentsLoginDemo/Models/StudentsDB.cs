using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace WebApiStudentsLoginDemo.Models
{
    static public class StudentsDB
    {
        static bool local = false;
        static string strCon = null;
        static string strConLocal = @"Data Source=E440\SQLEXPRESS;Initial Catalog=UsersDB;Integrated Security=True";
        static string strConLIVEDNS = @"Data Source=185.60.170.14;Integrated Security=False;User ID=site23;Password=gB7%94jk;";

        static StudentsDB()
        {
            if (local)
            {
                strCon = strConLocal;
            }
            else
            {
                strCon = strConLIVEDNS;
            }
        }

        public static List<Student> GetAllStudents()
        {
            List<Student> sl = new List<Student>();
            SqlConnection con = new SqlConnection(strCon);
            SqlCommand comm = new SqlCommand("SELECT * FROM StudentsTB", con);
            comm.Connection.Open();
            SqlDataReader reader = comm.ExecuteReader();
            while (reader.Read())
            {
                Student s = new Student(
                    (int)reader["ID"],
                    (string)reader["Name"], (string)reader["Email"], (string)reader["Password"],
                    (int)reader["Grade"]);
                sl.Add(s);
            }
            comm.Connection.Close();
            return sl;
        }

        public static Student GetStudentByEmailAndPassword(string email, string password)
        {
            Student s = null;
            SqlConnection con = new SqlConnection(strCon);
            SqlCommand comm = new SqlCommand(
                $" SELECT * FROM StudentsTB " +
                $" WHERE Email='{email}' AND Password='{password}'", con);
            comm.Connection.Open();
            SqlDataReader reader = comm.ExecuteReader();
            if (reader.Read())
            {
                s = new Student(
                    (int)reader["ID"],
                    (string)reader["Name"], (string)reader["Email"], (string)reader["Password"],
                    (int)reader["Grade"]);
            }
            comm.Connection.Close();
            return s;
        }

        public static Student GetStudentByEmail(string email)
        {
            Student s = null;
            SqlConnection con = new SqlConnection(strCon);
            SqlCommand comm = new SqlCommand(
                $" SELECT * FROM StudentsTB " +
                $" WHERE Email='{email}'", con);
            comm.Connection.Open();
            SqlDataReader reader = comm.ExecuteReader();
            if (reader.Read())
            {
                s = new Student(
                    (int)reader["ID"],
                    (string)reader["Name"], (string)reader["Email"], (string)reader["Password"],
                    (int)reader["Grade"]);
            }
            comm.Connection.Close();
            return s;
        }

        public static Student InsertStudentToDb(Student val)
        {
            if (GetStudentByEmail(val.Email) != null) return null;

            Student s = null;
            SqlConnection con = new SqlConnection(strCon);
            SqlCommand comm = new SqlCommand(
                $" INSERT INTO StudentsTB(Name, Email, Password, Grade) " +
                $" VALUES('{val.Name}', '{val.Email}', '{val.Password}', {val.Grade})", con);
            comm.Connection.Open();
            int res = comm.ExecuteNonQuery();
            comm.Connection.Close();
            if (res == 1)
            {
                s = GetStudentByEmail(val.Email);
            }
            return s;
        }

        public static Student GetStudentById(int id)
        {
            Student s = null;
            SqlConnection con = new SqlConnection(strCon);
            SqlCommand comm = new SqlCommand(
                $" SELECT * FROM StudentsTB " +
                $" WHERE ID={id}", con);
            comm.Connection.Open();
            SqlDataReader reader = comm.ExecuteReader();
            if (reader.Read())
            {
                s = new Student(
                    (int)reader["ID"],
                    (string)reader["Name"], (string)reader["Email"], (string)reader["Password"],
                    (int)reader["Grade"]);
            }
            comm.Connection.Close();
            return s;
        }
        public static int DeleteStudentById(int id)
        {
            string strComm =
                    $" DELETE StudentsTB " +
                    $" WHERE ID={id}";

            return ExcNonQ(strComm);
        }

        public static int UpdateStudent(Student s)
        {
            string strComm =
                  $" UPDATE StudentsTB SET " +
                  $" Name='{s.Name}' , " +
                  $" Email='{s.Email}' , " +
                  $" Password='{s.Password}' , " +
                  $" Grade={s.Grade} " +
                  $" WHERE ID={s.ID}";

            return ExcNonQ(strComm);
        }

        private static int ExcNonQ(string comm2Run)
        {
            SqlConnection con = new SqlConnection(strCon);
            SqlCommand comm = new SqlCommand(comm2Run, con);
            comm.Connection.Open();
            int res = comm.ExecuteNonQuery();
            comm.Connection.Close();
            return res;
        }

        public static List<Student> ExcReader(string comm2Run)
        {
            List<Student> sl = new List<Student>();
            SqlConnection con = new SqlConnection(strCon);
            SqlCommand comm = new SqlCommand(comm2Run, con);
            comm.Connection.Open();
            SqlDataReader reader = comm.ExecuteReader();
            while (reader.Read())
            {
                Student s = new Student(
                    (int)reader["ID"],
                    (string)reader["Name"], (string)reader["Email"], (string)reader["Password"],
                    (int)reader["Grade"]);
                sl.Add(s);
            }
            comm.Connection.Close();
            return sl;
        }

    }
}