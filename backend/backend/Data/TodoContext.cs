// Data/TodoContext.cs
using Microsoft.EntityFrameworkCore;
using backend.Models; // Make sure this matches your project's namespace

namespace backend.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        // This DbSet represents the collection of TodoItem entities in the database
        public DbSet<TodoItem> TodoItems { get; set; } = null!;
    }
}
