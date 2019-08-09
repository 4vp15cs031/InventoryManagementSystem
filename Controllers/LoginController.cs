using System.Web.Http;
using InventoryLib;
using System.Web.Http.Cors;

namespace InventoryManagment.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        public string VerifyLogin(User usr)
        {
            Inventory iv = new Inventory();
            return (iv.verifyLogin(usr.username, usr.password, usr.typeofuser));
        }
    }
}
