using System.Collections.Generic;

namespace ReactPoc.Models
{
    public class HomeViewModel
    {
        public string PageTitle { get; set; }
        public List<MenuItem> Routes { get; set; }
    }
}