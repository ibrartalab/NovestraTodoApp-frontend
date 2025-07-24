// Services/UserService.cs
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using BCrypt.Net; // For password hashing
using backend.Models;
using backend.DTOs;



namespace backend.Services
{
    public class UserService : IUserService
    {
        // In-memory user store for demonstration. In a real app, this would be a database.
        private static List<User> _users = new List<User>();
        private readonly IConfiguration _configuration;

        public UserService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<User?> Register(RegisterRequest request)
        {
            return await Task.Run(() =>
            {
                // Check if username already exists
                if (_users.Any(u => u.Username == request.Username))
                {
                    return null; // Or throw a specific exception
                }

                // Hash the password before storing it
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

                var newUser = new User
                {
                    Id = _users.Count > 0 ? _users.Max(u => u.Id) + 1 : 1, // Simple ID generation
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Username = request.Username,
                    PasswordHash = passwordHash
                };

                _users.Add(newUser);
                return newUser;
            });
        }

        public async Task<AuthResponse?> Login(LoginRequest request)
        {
            var user = _users.FirstOrDefault(u => u.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return null; // Invalid credentials
            }

            // Generate JWT token
            var token = GenerateJwtToken(user);

            return new AuthResponse {FirstName= user.FirstName,LastName=user.LastName, Username = user.Username, Token = token };
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            // Get the JWT secret key from configuration
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured."));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username)
                    // Add other claims like roles if needed: new Claim(ClaimTypes.Role, "Admin")
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Token expires in 1 hour
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
