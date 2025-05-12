
public interface IBookList
{
    long Id { get; set; }
    string  BookName { get; set; }
    string BookDescription { get; set; }
    string ImageUrl { get; set; }
    string Author { get; set; }
    string? SeriesName { get; set; }
    int? SeriesPart { get; set; }
    long CategoryId { get; set; }

    ICategory Category { get; set; }
    List<IBookLanguages> Languages { get; set; }

}