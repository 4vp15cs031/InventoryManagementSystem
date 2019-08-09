using System.Web.Http;
using InventoryLib;
using System.Web.Http.Cors;
using System.Collections.Generic;

namespace InventoryManagment.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SearchController : ApiController
    {
        [HttpGet]
        public List<Product> findSingleProduct(string productname)
        {
            Inventory iv = new Inventory();
            return (iv.SelectProductByName(productname));
        }
    }
}
