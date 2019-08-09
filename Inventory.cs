using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;  //for ADO.NET classes

namespace InventoryLib
{
    public class Inventory
    {
        SqlDataAdapter dauser,daproduct;
        DataSet dsu,dsp;
        SqlConnection con;
        SqlCommand cmd;

        public Inventory(){

        con = new SqlConnection();
        //con.ConnectionString = "Data Source=VDC01LTC4521;Initial Catalog=InventoryManagementDB;Persist Security Info=True;User ID=sa;Password=welcome1@";

        //read connectionString from config file
        string constr = ConfigurationManager.ConnectionStrings["sqlconstr"].ConnectionString;
        con.ConnectionString = constr;

        //create command
        cmd = new SqlCommand();
        cmd.Connection = con;  //linking connection to command
        cmd.CommandText = "select * from tbl_user";
      
        //configure Data Adapter
         dauser = new SqlDataAdapter(cmd);
         dsu = new DataSet();
       //create and fill Dataset
         dauser.Fill(dsu, "tbl_user");

       //Add Constraint
         dsu.Tables[0].Constraints.Add("pk1", dsu.Tables[0].Columns[0], true);
            
            
        //create command
        cmd.CommandText = "select * from tbl_product";

       //configure Data Adapter
        daproduct = new SqlDataAdapter(cmd);
        dsp = new DataSet();
        //create and fill Dataset
        dauser.Fill(dsp, "tbl_product");

        //Add Constraint
        dsp.Tables[0].Constraints.Add("pk1", dsp.Tables[0].Columns[0], true);
        }


        //Login verification
        public string verifyLogin(string username, string password, string typeofuser)
    {
            try
            {
                //open the connection
                con.Open();

                //configure command for SELECT ALL statement
                cmd.CommandText = "select * from tbl_user where username=@un and password=@ps and typeofuser=@tou";

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@un", username);
                cmd.Parameters.AddWithValue("@ps", password);
                cmd.Parameters.AddWithValue("@tou", typeofuser);


                //DataRow[] row = dsu.Tables[0].Select("username=" +username+ "and password"+ password+ "and typeofuser=" +typeofuser);
                SqlDataReader row = cmd.ExecuteReader();

                if (row.Read())
                {
                    if (row[5].ToString() == "admin")
                    {
                        return "SuccessAdmin";

                    }
                    else
                    {
                        return "SuccessUser";
                    }
                }
                else
                {
                    return "Failure";
                }
            }
            catch(SqlException)
            {
                return "Failure";
                
            }
            finally
            {
                con.Close();
            }
    }

    //Select all Users
    public List<User> SelectAllUsers()
    {
        List<User> userLst = new List<User>();
            //SqlDataReader row = cmd.ExecuteReader();
         foreach (DataRow row in dsu.Tables[0].Rows)
          {
            User user = new User();
            user.userid = (int)row[0];
            user.username = row[1].ToString();
            user.userphone = (long)row[2];
            user.useremail = row[3].ToString();
            user.password = row[4].ToString();
            user.typeofuser = row[5].ToString();

            //add the record to collection
            userLst.Add(user);
        }
        return userLst;
    }

        //Select all Products
        public List<Product> SelectAllProducts()
        {
            List<Product> prodLst = new List<Product>();
            //SqlDataReader row = cmd.ExecuteReader();
            foreach (DataRow row in dsp.Tables[0].Rows)
            {
                Product prod = new Product();
                prod.productid = (int)row[0];
                prod.productname = row[1].ToString();
                prod.brand = row[2].ToString();
                prod.instock=(int)row[3];
                prod.price = Convert.ToSingle(row[4]);
                prod.unitofmeasure = row[5].ToString();
                prod.description = row[6].ToString();

                //add the record to collection
                prodLst.Add(prod);
            }
            return prodLst;
        }

        //Select Product
        public List<Product> SelectProductByName(string productname)
        {
            List<Product> prodLst = new List<Product>();

            //open the connection
            con.Open();

            //configure command for SELECT ALL statement
            cmd.CommandText = "select * from tbl_product where productname=@pn";

            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@pn", productname);
            SqlDataReader row = cmd.ExecuteReader();

            //DataRow[] row= dsp.Tables[0].Select("productname=" + productname);
            if (row.Read())
            {
                Product prod = new Product();
                prod.productid = (int)row[0];
                prod.productname = row[1].ToString();
                prod.brand = row[2].ToString();
                prod.instock = (int)row[3];
                prod.price = Convert.ToSingle(row[4]);
                prod.unitofmeasure = row[5].ToString();
                prod.description = row[6].ToString();

                //add the record to collection
                prodLst.Add(prod);
            }
            else
            {
               // throw new Exception("Item Not Found");
            }
               
            con.Close();
            return prodLst;
        }


        //Inserting Product
        public string InsertProduct(Product prod)
        {
            try
            {
                if (prod != null)
                {
                    cmd.CommandText = "insert into tbl_product values(@pn,@pb,@ps,@pp,@pu,@pd)";
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@pn", prod.productname);
                    cmd.Parameters.AddWithValue("@pb", prod.brand);
                    cmd.Parameters.AddWithValue("@ps", prod.instock);
                    cmd.Parameters.AddWithValue("@pp", prod.price);
                    cmd.Parameters.AddWithValue("@pu", prod.unitofmeasure);
                    cmd.Parameters.AddWithValue("@pd", prod.description);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    return "Success";
                }
                else
                {
                    throw new NullReferenceException("Please enter the values") ;
                }
            }
            catch (SqlException)
            {
                return "Failure";
            }
            catch (NullReferenceException)
            {
                return "Failure";
            }
            catch (Exception)
            {
                return "Failure";
            }
            finally
            {
                con.Close();
            }
        }

        //Update Stock
        public string UpdateProduct(Product prod)
        {
            try
            {
                //configure command for Update statement
                cmd.CommandText = "update tbl_product set instock=@stk where productid=@pid";
                cmd.CommandType = CommandType.Text;

                //specify the values for the parameters
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@stk", prod.instock);
                cmd.Parameters.AddWithValue("@pid", prod.productid);

                //open connection
                con.Open();
                int recordAffected = cmd.ExecuteNonQuery();
                if (recordAffected == 0)
                    throw new Exception("ProductID dosn't Exists");
                //excecute the command
                cmd.ExecuteNonQuery();

                return "Success";
            }
            catch (SqlException)
            {
                return "Failure";
            }
            catch (Exception)
            {
                return "Failure";
            }
            finally
            {
                //close connecetion
                con.Close();
            }
        }

        //Update Product
        public string UpdateProductbyadmin(Product prod)
        {
            try
            {
                //configure command for Update statement
                cmd.CommandText = "update tbl_product set productname=@pn,brand=@brd,instock=@stk,price=@pc,unitofmeasure=@um,description=@des where productid=@pid";
                cmd.CommandType = CommandType.Text;

                //specify the values for the parameters
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@pn", prod.productname);
                cmd.Parameters.AddWithValue("@brd", prod.brand);
                cmd.Parameters.AddWithValue("@stk", prod.instock);
                cmd.Parameters.AddWithValue("@pc", prod.price);
                cmd.Parameters.AddWithValue("@um", prod.unitofmeasure);
                cmd.Parameters.AddWithValue("@des", prod.description);
                cmd.Parameters.AddWithValue("@pid", prod.productid);

                //open connection
                con.Open();
                int recordAffected = cmd.ExecuteNonQuery();
                if (recordAffected == 0)
                    throw new Exception("ProductID dosn't Exists");
                //excecute the command
                cmd.ExecuteNonQuery();

                return "Success";
            }
            catch (SqlException)
            {
                return "Failure";
            }
            catch (Exception)
            {
                return "Failure";
            }
            finally
            {
                //close connecetion
                con.Close();
            }
        }

        //Inserting User
        public string InsertUser(User usr)
        {
            try
            {
                if (usr != null)
                {
                    cmd.CommandText = "insert into tbl_user values(@un,@up,@um,@pswd,@tou)";
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@un", usr.username);
                    cmd.Parameters.AddWithValue("@up", usr.userphone);
                    cmd.Parameters.AddWithValue("@um", usr.useremail);
                    cmd.Parameters.AddWithValue("@pswd", usr.password);
                    cmd.Parameters.AddWithValue("@tou", usr.typeofuser);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    return "Success";
                }
                else
                {
                    return "Failure";
                throw new NullReferenceException("Please enter the values");

                }
            }
            catch (SqlException)
            {
                return "Failure";
            }
            catch (NullReferenceException)
            {
                return "Failure";
            }
            catch (Exception)
            {
                return "Failure";
            }
            finally
            {
                con.Close();
            }
        }

        //Update User
        public string UpdateUser(User usr)
        {
            try
            {
                //configure command for Update statement
                cmd.CommandText = "update tbl_user set username=@un,userphone=@up,usermail=@uel,typeofuser=@tou where userid=@uid";
                cmd.CommandType = CommandType.Text;

                //specify the values for the parameters
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@un", usr.username);
                cmd.Parameters.AddWithValue("@up", usr.userphone);
                cmd.Parameters.AddWithValue("@uel", usr.useremail);
                cmd.Parameters.AddWithValue("@tou", usr.typeofuser);
                cmd.Parameters.AddWithValue("@uid", usr.userid);

                //open connection
                con.Open();
                int recordAffected = cmd.ExecuteNonQuery();
                if (recordAffected == 0)
                    throw new Exception("UserID dosn't Exists");
                //excecute the command
                cmd.ExecuteNonQuery();

                return "Success";
            }
            catch (SqlException)
            {
                return "Failure";
            }
            catch (Exception)
            {
                return "Failure";
            }
            finally
            {
                //close connecetion
                con.Close();
            }
        }

        //Delete Product
        public string DeleteProduct(int productid)
        {
            try
            {
                //configure command for Delete statement
                cmd.CommandText = "delete from tbl_product where productid=" + productid;
                cmd.CommandType = CommandType.Text;

                //open connection
                con.Open();
                int recordAffected = cmd.ExecuteNonQuery();
                if (recordAffected == 0)
                    throw new Exception("Product Not Exists");
                //excecute the command
                cmd.ExecuteNonQuery();
                return "Success";
            }
            catch (SqlException)
            {
                return "Failure";
            }
            catch (Exception)
            {
                return "Failure";
            }
            finally
            {
                //close connecetion
                con.Close();
            }
        }

        //Delete User
        public string DeleteUser(int userid)
        {
            try
            {
                //configure command for Delete statement
                cmd.CommandText = "delete from tbl_user where userid=" + userid;
                cmd.CommandType = CommandType.Text;

                //open connection
                con.Open();
                int recordAffected = cmd.ExecuteNonQuery();
                if (recordAffected == 0)
                    throw new Exception("User Not Exists");
                //excecute the command
                cmd.ExecuteNonQuery();
                return "Success";
            }
            catch (SqlException)
            {
                return "Failure";
            }
            catch (Exception)
            {
                return "Failure";
            }
            finally
            {
                //close connecetion
                con.Close();
            }
        }
    }
}
