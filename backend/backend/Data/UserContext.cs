using System.Collections.Generic;
using backend.Models;

namespace backend.Data
{
    public static class UserContext
    {
        // Static list to store users for learning/demo purposes
        public static List<User> Users { get; } = new List<User>();

        // Example method to add a user
        public static void AddUser(User user)
        {
            Users.Add(user);
        }

        // Example method to get all users
        public static IEnumerable<User> GetAllUsers()
        {
            return Users;
        }

        // Example method to find a user by username
        public static User? FindByUsername(string username)
        {
            return Users.Find(u => u.Username == username);
        }
    }
}