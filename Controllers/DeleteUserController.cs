using System.Web.Http;
using InventoryLib;
using System.Web.Http.Cors;

namespace InventoryManagment.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DeleteUserController : ApiController
    {
        [HttpGet]
        public string deleteUser(int userid)
        {
            Inventory iv = new Inventory();
            return (iv.DeleteUser(userid));
        }
    }
}
