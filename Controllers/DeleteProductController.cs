using System;
using System.Web.Http;
using InventoryLib;
using System.Web.Http.Cors;

namespace InventoryManagment.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DeleteProductController : ApiController
    {
        [HttpGet]
        public string deleteProduct(int productid)
        {
            Inventory iv = new Inventory();
            return (iv.DeleteProduct(productid));
        }
    }
}
