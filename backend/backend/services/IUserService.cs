// Services/IUserService.cs
using backend.Models;
using backend.DTOs;



namespace backend.Services
{
    public interface IUserService
    {
        Task<User?> Register(RegisterRequest request);
        Task<AuthResponse?> Login(LoginRequest request);
    }
}

