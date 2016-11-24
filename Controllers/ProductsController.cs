using Microsoft.AspNetCore.Mvc;

namespace ReactPoc.Controllers
{
    // [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        public IActionResult TestById(string id)
        {
            return new ObjectResult(id);
        }

        public IActionResult TestByTest(string test)
        {
            return new ObjectResult(test + "hest");
        }
        
        public IActionResult Test()
        {
            return new ObjectResult(3000);
        }

        public IActionResult Index()
        {
            var products = new [] {Product.createProduct(1, "Test"), Product.createProduct(2, "Test2")};
            return new ObjectResult(products);
        }

        private class Product
        {
            public int Id { get; set; }
            public int Price { get; set; }
            public string Name { get; set; }

            public static Product createProduct(int id, string name, int price = 0)
            {
                return new Product
                {
                    Id = id,
                    Name = name,
                    Price = price
                };
            }
        }
    }
}