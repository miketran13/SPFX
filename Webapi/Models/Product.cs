using System;

namespace SPFX.Models
{
    public class Product
    {
        public int ProductID { get; set; }

        public string Name { get; set; }
        public string ProductNumber { get; set; }

        public string Color { get; set; }

        public Int16 SafetyStockLevel { get; set; }

          public decimal ListPrice { get; set; }
             public DateTime ModifiedDate { get; set; }
    }
}