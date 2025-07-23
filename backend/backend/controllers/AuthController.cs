// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using backend.DTOs;
using backend.Services;

namespace MyProjectFolder.Controllers
{
    [Route("api/[controller]")] // Base route: /api/Auth
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        // POST: api/Auth/register
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
        {
            var user = await _userService.Register(request);
            if (user == null)
            {
                return BadRequest("Username already exists.");
            }

            // After successful registration, log them in and return a token
            var authResponse = await _userService.Login(new LoginRequest { Username = request.Username, Password = request.Password });
            if (authResponse == null)
            {
                // This case should ideally not happen if registration was successful
                return StatusCode(500, "User registered but failed to log in automatically.");
            }

            return Ok(authResponse); // Returns 200 OK with username and token
        }

        // POST: api/Auth/login
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
        {
            var authResponse = await _userService.Login(request);
            if (authResponse == null)
            {
                return Unauthorized("Invalid username or password."); // Returns 401 Unauthorized
            }

            return Ok(authResponse); // Returns 200 OK with username and token
        }
    }
}