using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BookCompassDbContext _context;
        private readonly string TokenAPI = "1234BookCompassToken";

        public AuthController(BookCompassDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult> CreateUser(UserRegisterDto userRegisterDto)
        {
            var headers = Request.Headers;
            if(!headers.ContainsKey("Authorization"))
            {
                return Unauthorized(new {message = "Igen behörighet. Token saknas."});
            }

            var token = headers["Authorization"].ToString();
            if(token.StartsWith("Bearer"))
            {
                token = token.Substring("Bearer ".Length);
            }

            if(token != TokenAPI)
            {
                return Unauthorized(new {message = "felakt token"});
            }

            if(string.IsNullOrWhiteSpace(userRegisterDto.UserName) ||
                string.IsNullOrWhiteSpace(userRegisterDto.Email) || 
                string.IsNullOrWhiteSpace(userRegisterDto.Password) ||
                string.IsNullOrWhiteSpace(userRegisterDto.ConfirmPassword))
                
            {
                return BadRequest(new { message = "Alla fält måste vara ifyllda." });
            }

            if(userRegisterDto.Password != userRegisterDto.ConfirmPassword)
            {
                return BadRequest(new { message = "Lösenorden matchar inte." });
            }

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.email == userRegisterDto.Email ||
                u.userName == userRegisterDto.UserName);

            if(existingUser != null)
            {
                return Conflict(new {message = "Användarnamn eller e-postadress är redan registrerad."});
            }

            var passwordHasher = new PasswordHasher<string>();
            var hashedPassword = passwordHasher.HashPassword(string.Empty, userRegisterDto.Password);

            var newUser = new User
            {
                userName = userRegisterDto.UserName,
                email = userRegisterDto.Email,
                PasswordHash = hashedPassword
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Användare registrerad." });
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(UserLoginDto user)
        {
            var headers = Request.Headers;
            if(!headers.ContainsKey("Authorization"))
            {
                return Unauthorized(new {message = "Igen behörighet. Token saknas."});
            }

            var token = headers["Authorization"].ToString();
            if(token.StartsWith("Bearer"))
            {
                token = token.Substring("Bearer ".Length);
            }

            if(token != TokenAPI)
            {
                return Unauthorized(new {message = "felakt token"});
            }

            var userToLogin = await _context.Users
                .FirstOrDefaultAsync(u => u.userName == user.UserName);
            if(userToLogin == null)
            {
                return Unauthorized(new {message = "Fel användarnamn eller lösenord."});
            }

            var passwordHasher = new PasswordHasher<string>();
            var result = passwordHasher.VerifyHashedPassword(string.Empty, userToLogin.PasswordHash, user.Password);

            if(result == PasswordVerificationResult.Success)
            {
                return Ok(new { message = "Välkommen till BookCompass! Du är nu inloggad!" });
            }

            return Unauthorized(new { message = "Fel användarnamn eller lösenord." });
        }
}   }


