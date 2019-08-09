using System.Web.Http;
using InventoryLib;
using System.Web.Http.Cors;

namespace InventoryManagment.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class userUpdateController : ApiController
    {
        public string updateUser(User usr)
        {
            Inventory iv = new Inventory();
            return (iv.UpdateUser(usr));
        }
    }
}
