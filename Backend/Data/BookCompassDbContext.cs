using Microsoft.EntityFrameworkCore;

public class BookCompassDbContext : DbContext {
    public BookCompassDbContext(DbContextOptions<BookCompassDbContext> options) : base(options) {
        this.Database.EnsureCreated();   
    }

    public DbSet<BookList> BookLists { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<BookList>().HasData(

        );
    }
}