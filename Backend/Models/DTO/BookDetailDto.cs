public class BookDetailDto
{
    public long Id { get; set; }
    public string BookName { get; set; } = string.Empty;
    public string BookDescription { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string? SeriesName { get; set; }
    public int? SeriesPart { get; set; }
    public string Category { get; set; } = string.Empty;
    public List<string> Languages { get; set; } = new();
}