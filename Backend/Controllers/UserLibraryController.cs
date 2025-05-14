using System.IO.Compression;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLibraryController : ControllerBase
    {
        private readonly BookCompassDbContext _context;
        private readonly string TokenAPI = "1234BookCompassToken";

        public UserLibraryController(BookCompassDbContext context)
        {
            _context = context;
        }

        [HttpPost("addBookToMyLibrary")]
        public async Task<IActionResult> AddBookToMyLibrary(UserBookDto userBookDto)
        {
            if(!Request.Headers.TryGetValue("Authorization", out var tokenHeader)
                || !Request.Headers.TryGetValue("X-User-Name", out var userNameHeader))
            {
                return Unauthorized(new {message = "Token or username is missing."});
            }

            var token = tokenHeader.ToString().Replace("Bearer ", "");
            if(token != TokenAPI)
            {
                return Unauthorized(new {message = "Invalid token."});
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.userName == userBookDto.UserName);

            if(user == null)
            {
                return NotFound(new {message = "User not found."});
            }

            var existingEntry = await _context.UserBooks
                .FirstOrDefaultAsync(ub => ub.UserId == user.id && ub.BookId == userBookDto.BookId);

            if(existingEntry != null)
            {
                // Om samma lista, ge felmeddelande
                if (existingEntry.ListType == userBookDto.ListType)
                {
                    return Conflict(new { message = $"The book is already in the '{userBookDto.ListType}' list." });
                }

                existingEntry.ListType = userBookDto.ListType;
                _context.UserBooks.Update(existingEntry);
                await _context.SaveChangesAsync();
                return Ok(new { message = $"Book moved to '{userBookDto.ListType}' list." });
            }

            var userBook = new UserBook
            {
                UserId = user.id,
                BookId = userBookDto.BookId,
                ListType = userBookDto.ListType
            };

            _context.UserBooks.Add(userBook);
            await _context.SaveChangesAsync();
            

            return Ok(new { message = $"Book added to '{userBookDto.ListType}' list." });
        }

        [HttpGet("getMyLibrary/{userName}")]
        public async Task<ActionResult> GetUserMyLibraryBooks(string username)
        {
            Console.WriteLine($"Försöker hämta användare: {username}");
            var user = await _context.Users.FirstOrDefaultAsync(u => u.userName == username);
            if(user == null)
            {
                return NotFound(new {message = "Användaren med det användarnamnet hittades inte."});
            }

            Console.WriteLine($"Användare hittad: {user.userName}, ID: {user.id}");
            Console.WriteLine($"Antal UserBooks för användare {user.userName}: {_context.UserBooks.Count(ub => ub.UserId == user.id)}");

            var books = await _context.UserBooks
                .Where(ub => ub.UserId == user.id)
                .Include(ub => ub.Books)
                .GroupBy(ub => ub.ListType)
                .Select(group => new 
                {
                    ListType = group.Key,
                    Books = group.Select(ub => new 
                    {
                        ub.Books.Id,
                        ub.Books.BookName,
                        ub.Books.Author,
                        ub.Books.ImageUrl
                    }).ToList()
                })
                .ToListAsync();

            Console.WriteLine($"Böcker som hittades: {books.Count}");

            if(books == null || books.Count == 0)
            {
                return NotFound(new {message = "Inga böcker hittades i din lista."});
            }

            return Ok(books);
            
        }
    }
}
