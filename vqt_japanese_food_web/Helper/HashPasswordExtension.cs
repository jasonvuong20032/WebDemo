using JapaneseFood.Entity.User;
using Microsoft.AspNetCore.Identity;

namespace vqt_japanese_food_web.Helper
{
    public static class HashPasswordExtension
    {
        public static string HashPassword(string password)
        {
            var hasher = new PasswordHasher<UserEntities>();

            string hashedPassword = hasher.HashPassword(null, password);
            return hashedPassword;
        }
        public static string ReHashPassword(string password)
        {
            var hasher = new PasswordHasher<UserEntities>();

            string hashedPassword = hasher.HashPassword(null, password);
            return hashedPassword;
        }
    }
}
