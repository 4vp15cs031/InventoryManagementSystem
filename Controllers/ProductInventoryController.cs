using System.Web.Http;
using InventoryLib;
using System.Web.Http.Cors;
using System.Collections.Generic;
namespace InventoryManagment.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class ProductInventoryController : ApiController
    {
       

        [HttpGet]
        public List<Product> getProducts()
        {
            Inventory iv = new Inventory();
            return (iv.SelectAllProducts());
        }

       [HttpPost]
        public string PostProduct([FromBody]Product prod)
        {
            Inventory iv = new Inventory();
            return (iv.InsertProduct(prod));
        }

    }
}
