using System.Web.Http;
using InventoryLib;
using System.Web.Http.Cors;

namespace InventoryManagment.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UpdateInventoryController : ApiController
    {
        public string updateProduct(Product prod)
        {
            Inventory iv = new Inventory();
            if(prod.brand==null)
            return (iv.UpdateProduct(prod));
            else
                return (iv.UpdateProductbyadmin(prod));
        }
    }
}
