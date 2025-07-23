// Models/TodoItem.cs
namespace backend.Models
{
    public class TodoItem
    {
        public long Id { get; set; } // Primary Key
        public string? Name { get; set; }
        public bool IsComplete { get; set; }
        // You might add a UserId here later for authentication
        // public string? UserId { get; set; }
    }
}