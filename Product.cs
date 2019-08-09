using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryLib
{
    public class Product
    {
        public int productid {get; set;}
        public string productname { get; set; }
        public string brand { get; set; }
        public int instock { get; set; }
        public float price { get; set; }
        public string unitofmeasure { get; set; }
        public string description { get; set; }
    }
}
