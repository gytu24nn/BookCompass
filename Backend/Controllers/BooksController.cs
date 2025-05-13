using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookCompassDbContext _context;

        public BooksController(BookCompassDbContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<CategoryWithBooksDto>>> GetCategoriesWithBooks()
        {
            var categories = await _context.Categories
                .Include(c => c.Books)
                .Select(c => new CategoryWithBooksDto
                {
                    CategoryId = c.CategoryId,
                    CategoryName = c.CategoryName,
                    Books = c.Books.Select(b => new BookSummaryDto
                    {
                        Id = b.Id,
                        BookName = b.BookName,
                        Author = b.Author,
                        ImageUrl = b.ImageUrl
                    }).ToList()
                })
                .ToListAsync();

                return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookDetailDto>> GetBookById(long id)
        {
            var book = await _context.BookLists
                .Include(b => b.Category)
                .Include(b => b.Languages)
                .FirstOrDefaultAsync(b => b.Id == id);
            
            if(book == null) return NotFound();

            var result = new BookDetailDto
            {
                Id = book.Id,
                BookName = book.BookName,
                BookDescription = book.BookDescription,
                Author = book.Author,
                ImageUrl = book.ImageUrl,
                SeriesName = book.SeriesName,
                SeriesPart = book.SeriesPart,
                Category = book.Category.CategoryName,
                Languages = book.Languages.Select(l => l.Languages).ToList()
            };

            return Ok(result);
        }
    }
}
