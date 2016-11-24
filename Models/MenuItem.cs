namespace ReactPoc.Models
{
    public class MenuItem
    {
        public string Title { get; set; }
        public string Url { get; set; }

        public static MenuItem CreateItem(string title, string url)
        {
            return new MenuItem
            {
                Title = title,
                Url = url
            };
        }
    }
}