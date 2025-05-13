public class User 
{
    public int id { get; set; }
    public Guid userGuid { get; set; } = Guid.NewGuid();
    public string userName { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    public List<UserBook> UserBooks { get; set; }
}