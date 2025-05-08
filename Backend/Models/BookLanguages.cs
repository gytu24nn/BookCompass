public class BookLanguages : IBookLanguages
{
    public long LanguageId {get; set;}
    public string Languages { get; set; }
    public long BookId { get; set; }
    public BookList Book { get; set; }
}