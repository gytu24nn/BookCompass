public class BookList : IBookList
{
    public long Id { get; set; }
    public string BookName { get; set; } = string.Empty; 
    public string BookDescription { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string? SeriesName { get; set; }  // T.ex. "Harry Potter"
    public int? SeriesPart { get; set; }     // T.ex. 1 (för del 1)

    public long CategoryId { get; set; }

    public ICategory Category { get; set; }
    public List<IBookLanguages> Languages { get; set; } = new List<IBookLanguages>();
}