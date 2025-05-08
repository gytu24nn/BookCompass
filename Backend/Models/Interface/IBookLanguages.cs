public interface IBookLanguages
{
    public long LanguageId { get; set; }
    public string Languages { get; set; }
    public long BookId { get; set; }
    BookList Book { get; set; }
}