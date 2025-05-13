public class UserBook
{
    public long Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } 

    public long BookId { get; set; }
    public BookList Books { get; set; }

    public string ListType { get; set; } = string.Empty;    



}