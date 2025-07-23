// Controllers/TodoItemsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
// using backend.Data; // Your DbContext
// using backend.Data; // Your DbContext
using backend.Data; // Ensure this matches the namespace where TodoContext is defined
using backend.Models; // Your TodoItem model

namespace backend.Controllers
{
    [Route("api/[controller]")] // Defines the base route for this controller (e.g., /api/TodoItems)
    [ApiController] // Indicates that this class is an API controller
    [Authorize] // Ensures that all actions in this controller require authentication
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoContext _context;

        // Constructor: DbContext is injected here by the Dependency Injection system
        public TodoItemsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
        // Retrieves all ToDo items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            // Check if TodoItems DbSet is null (shouldn't happen if configured correctly)
            if (_context.TodoItems == null)
            {
                return NotFound();
            }
            // Return all todo items from the database
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/TodoItems/5
        // Retrieves a single ToDo item by its ID
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            if (_context.TodoItems == null)
            {
                return NotFound();
            }
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound(); // Returns 404 Not Found if item doesn't exist
            }

            return todoItem; // Returns 200 OK with the todo item
        }

        // PUT: api/TodoItems/5
        // Updates an existing ToDo item
        // To test: PUT request to /api/TodoItems/5 with JSON body:
        // { "id": 5, "name": "Updated Task", "isComplete": true }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
        {
            // Ensure the ID in the URL matches the ID in the request body
            if (id != todoItem.Id)
            {
                return BadRequest(); // Returns 400 Bad Request
            }

            // Mark the entity as modified so EF Core knows to update it
            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync(); // Save changes to the database
            }
            catch (DbUpdateConcurrencyException)
            {
                // Handle cases where the item might have been deleted by another process
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Returns 204 No Content (successful update with no content to return)
        }

        // POST: api/TodoItems
        // Creates a new ToDo item
        // To test: POST request to /api/TodoItems with JSON body:
        // { "name": "New Task", "isComplete": false }
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            if (_context.TodoItems == null)
            {
                // This indicates an issue with DbContext setup,
                // as DbSet should not be null if configured.
                return Problem("Entity set 'TodoContext.TodoItems' is null.");
            }

            _context.TodoItems.Add(todoItem); // Add the new item to the DbSet
            await _context.SaveChangesAsync(); // Save changes to the database

            // Returns 201 Created status code and a Location header with the URL of the new item
            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/TodoItems/5
        // Deletes a ToDo item by its ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            if (_context.TodoItems == null)
            {
                return NotFound();
            }
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound(); // Returns 404 Not Found
            }

            _context.TodoItems.Remove(todoItem); // Remove the item from the DbSet
            await _context.SaveChangesAsync(); // Save changes to the database

            return NoContent(); // Returns 204 No Content (successful deletion)
        }

        // Helper method to check if a ToDo item exists
        private bool TodoItemExists(long id)
        {
            return (_context.TodoItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}