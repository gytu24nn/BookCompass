public class Category : ICategory
{
    public long CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public List<BookList> Books { get; set; } = new List<BookList>();
}