public class BookList : IBookList
{
    public long Id { get; set; }
    public string BookName { get; set; } = string.Empty; 
    public string BookDescription { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public int ReleaseYear { get; set; }
    public string Publisher { get; set; } = string.Empty;
    public long CategoryId { get; set; }

    public ICategory Category { get; set; }
    public List<IBookLanguages> Languages { get; set; } = new List<IBookLanguages>();
}