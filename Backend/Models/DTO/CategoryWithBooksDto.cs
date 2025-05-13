public class CategoryWithBooksDto
{
    public long CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public List<BookSummaryDto> Books { get; set; } = new();
}