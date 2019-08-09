using System.Web.Http;
using InventoryLib;
using System.Web.Http.Cors;
using System.Collections.Generic;

namespace InventoryManagment.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class UserInventoryController : ApiController
    {
        
        [HttpGet]
        public List<User> getUsers()
        {
            Inventory iv = new Inventory();
            return(iv.SelectAllUsers());
        }
       [HttpPost]
        public string AddUser(User usr)
        {
            Inventory iv = new Inventory();
            return (iv.InsertUser(usr));
        }

    }
}
