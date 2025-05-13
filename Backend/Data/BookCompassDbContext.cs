using Microsoft.EntityFrameworkCore;

public class BookCompassDbContext : DbContext
{
    public BookCompassDbContext(DbContextOptions<BookCompassDbContext> options) : base(options)
    {
        this.Database.EnsureCreated();
    }

    public DbSet<BookList> BookLists { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<BookLanguages> BookLanguages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed data for categories
        modelBuilder.Entity<Category>().HasData(
            new Category { CategoryId = 1, CategoryName = "Young Adult" },
            new Category { CategoryId = 2, CategoryName = "Crime" },
            new Category { CategoryId = 3, CategoryName = "Fantasy" }
        );

        // Seed data for books
        modelBuilder.Entity<BookList>()
        .HasOne(b => b.Category)
        .WithMany(c => c.Books)
        .HasForeignKey(b => b.CategoryId);


        modelBuilder.Entity<BookList>().HasData(
        new BookList
        {
            Id = 1,
            BookName = "A good girl's handbook of murder",
            BookDescription = " It's been five years since schoolgirl Andie Bell was murdered... Pip Fitz-Amobi reopens a closed murder case for her school project, believing the accused may be innocent. As she digs deeper, she uncovers secrets that put her own life at risk.",
            ImageUrl = "/img/a-good-girls-guide-to-murder.jpg",
            Author = "Holly Jackson",
            CategoryId = 1
        },
        new BookList
        {
            Id = 2,
            BookName = "The morning star",
            BookDescription = "It is late August, the last trembling days of the summer vacation... A mysterious star appears in the sky above Sørlandet, baffling everyone. As life resumes, strange and unsettling events begin to unfold, hinting at dark forces at play.",
            ImageUrl = "/img/morgonstjarnan.jpg",
            Author = "Karl Ove Knausgård",
            CategoryId = 1
        },
        new BookList
        {
            Id = 3,
            BookName = "Heartstopper part 1",
            BookDescription = "Charlie and Nick attend the same British boys' school... Charlie falls for his new classmate Nick, unsure if the feelings are mutual. Their friendship soon deepens into something more in this heartwarming story of love and identity.",
            ImageUrl = "/img/heartstopper-bok-1.jpg",
            Author = "Alice Oseman",
            CategoryId = 1
        },
        new BookList
        {
            Id = 4,
            BookName = "The Circle",
            BookDescription = "Six teenage girls discover they are witches and must unite to fight an ancient evil.",
            ImageUrl = "/img/cirkeln.jpg",
            Author = "Mats Strandberg & Sara B. Elfgren",
            CategoryId = 1
        },
        new BookList
        {
            Id = 5,
            BookName = "The Girl with the Dragon Tattoo",
            BookDescription = "Journalist Blomkvist and hacker Lisbeth Salander investigate a forty-year-old disappearance.",
            ImageUrl = "/img/9781529432398_383x_girl-with-the-dragon-tattoo_haftad.jpg",
            Author = "Stieg Larsson",
            CategoryId = 2
        },
        new BookList
        {
            Id = 6,
            BookName = "The Girl on the Train",
            BookDescription = "Rachel sees something from the train window that changes everything. But what did she really see?",
            ImageUrl = "/img/9781784161101_383x_the-girl-on-the-train_pocket.jpg",
            Author = "Paula Hawkins",
            CategoryId = 2
        },
        new BookList
        {
            Id = 7,
            BookName = "A Nearly Normal Family",
            BookDescription = "A teenage girl is arrested for murder. The family’s perfect facade begins to crack. How far would you go to protect your family? And how well do you really know your children?",
            ImageUrl = "/img/9789137509518_383x_en-helt-vanlig-familj_pocket.jpg",
            Author = "Mattias Edvardsson",
            CategoryId = 2
        },
        new BookList
        {
            Id = 8,
            BookName = "Harry Potter and the Philosopher’s Stone Part 1",
            BookDescription = "Harry discovers he is a wizard and begins his journey at Hogwarts – a magical adventure begins.",
            ImageUrl = "/img/9789129723946_medium_harry-potter-och-de-vises-sten.jpg",
            Author = "J.K. Rowling",
            CategoryId = 3
        },
        new BookList
        {
            Id = 9,
            BookName = "Taken by the mountains",
            BookDescription = "A student disappears from Järvhöga Läroverk... A student vanishes from a remote Swedish boarding school, sparking investigations and rumors. Julia, a bored local high schooler, joins the search and uncovers dark secrets about the school's past.",
            ImageUrl = "/img/9789129731323_383x_bergtagen_pocket.jpg",
            Author = "Camilla Sten",
            CategoryId = 3
        },
        new BookList
        {
            Id = 10,
            BookName = "Stardust",
            BookDescription = "Tristran ventures into a magical world to retrieve a fallen star for his beloved – but the world is full of dangers.",
            ImageUrl = "/img/9789180202020_383x_stardust_hardback.jpg",
            Author = "Neil Gaiman",
            CategoryId = 3
        },
        new BookList
        {
            Id = 11,
            BookName = "The Children of Odin Part 1",
            BookDescription = "Imagine missing something that everyone else has. Something that shows you belong in this world.",
            ImageUrl = "/img/9789180202037_383x_barnen-ur-odin.jpg",
            Author = "Siri Pettersen",
            CategoryId = 3
        }
    );

    modelBuilder.Entity<BookLanguages>()
        .HasOne(bl => bl.Book)
        .WithMany(b => b.Languages)
        .HasForeignKey(bl => bl.BookId);

    modelBuilder.Entity<BookLanguages>()
    .HasKey(bl => new { bl.BookId, bl.LanguageId });


    modelBuilder.Entity<BookLanguages>().HasData(
        //A good girls handbook of murder
        new BookLanguages { LanguageId = 1, Languages = "English", BookId = 1 },
        new BookLanguages { LanguageId = 2, Languages = "Swedish", BookId = 1 },

        //The morning star
        new BookLanguages { LanguageId = 3, Languages = "Norwegian", BookId = 2 },
        new BookLanguages { LanguageId = 4, Languages = "Swedish", BookId = 2 },

        //Heartstopper part 1
        new BookLanguages { LanguageId = 5, Languages = "English", BookId = 3 },
        new BookLanguages { LanguageId = 6, Languages = "Swedish", BookId = 3 },
        new BookLanguages { LanguageId = 7, Languages = "German", BookId = 3 },
        new BookLanguages { LanguageId = 8, Languages = "French", BookId = 3 },
        new BookLanguages { LanguageId = 9, Languages = "Spanish", BookId = 3 },

        //The Circle
        new BookLanguages { LanguageId = 10, Languages = "Swedish", BookId = 4 },
        new BookLanguages { LanguageId = 11, Languages = "English", BookId = 4 },
        new BookLanguages { LanguageId = 12, Languages = "German", BookId = 4 },
        new BookLanguages { LanguageId = 13, Languages = "French", BookId = 4 },
        new BookLanguages { LanguageId = 14, Languages = "Spanish", BookId = 4 },

        // Men who hate women
        new BookLanguages { LanguageId = 15, Languages = "Swedish", BookId = 5 },
        new BookLanguages { LanguageId = 16, Languages = "English", BookId = 5 },
        new BookLanguages { LanguageId = 17, Languages = "German", BookId = 5 },
        new BookLanguages { LanguageId = 18, Languages = "French", BookId = 5 },
        new BookLanguages { LanguageId = 19, Languages = "Spanish", BookId = 5 },

        // The girl on the train
        new BookLanguages { LanguageId = 20, Languages = "English", BookId = 6 },
        new BookLanguages { LanguageId = 21, Languages = "Swedish", BookId = 6 },
        new BookLanguages { LanguageId = 22, Languages = "Spanish", BookId = 6 },

        // A perfecly normal family 
        new BookLanguages { LanguageId = 23, Languages = "English", BookId = 7 },
        new BookLanguages { LanguageId = 24, Languages = "Swedish", BookId = 7 },
        new BookLanguages { LanguageId = 25, Languages = "Danish", BookId = 7 },
        new BookLanguages { LanguageId = 26, Languages = "Norwegian", BookId = 7 },

        //Harry Potter and the Philosopher’s Stone Part 1
        new BookLanguages { LanguageId = 27, Languages = "English", BookId = 8 },
        new BookLanguages { LanguageId = 28, Languages = "Swedish", BookId = 8 },
        new BookLanguages { LanguageId = 29, Languages = "Spanish", BookId = 8 },
        new BookLanguages { LanguageId = 30, Languages = "French", BookId = 8 },

        //Taken by the mountains
        new BookLanguages { LanguageId = 31, Languages = "Swedish", BookId = 9 },

        //Stardust
        new BookLanguages { LanguageId = 32, Languages = "English", BookId = 10 },
        new BookLanguages { LanguageId = 33, Languages = "Swedish", BookId = 10 },
        new BookLanguages { LanguageId = 34, Languages = "Italian", BookId = 10 },
        new BookLanguages { LanguageId = 35, Languages = "Finnish", BookId = 10 },

        //The Children of Odin Part 1
        new BookLanguages { LanguageId = 36, Languages = "Swedish", BookId = 11 },
        new BookLanguages { LanguageId = 37, Languages = "English", BookId = 11 },
        new BookLanguages { LanguageId = 38, Languages = "Norwegian", BookId = 11 },
        new BookLanguages { LanguageId = 39, Languages = "Danish", BookId = 11 },
        new BookLanguages { LanguageId = 40, Languages = "Finnish", BookId = 11 } 
    );

    }
}