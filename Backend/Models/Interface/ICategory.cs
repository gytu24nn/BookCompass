public interface ICategory
{
    long CategoryId { get; set; }
    string CategoryName { get; set; }
    List<BookList> Books { get; set; }
    
}