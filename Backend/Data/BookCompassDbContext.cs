using Microsoft.EntityFrameworkCore;

public class BookCompassDbContext : DbContext {
    public BookCompassDbContext(DbContextOptions<BookCompassDbContext> options) : base(options) {
        
    }
}