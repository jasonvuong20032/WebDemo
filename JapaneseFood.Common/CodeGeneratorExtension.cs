using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Common
{
    public static class CodeGeneratorExtension
    {
        private const string AllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        /// <summary>
        /// Generate product code (6 characters)
        /// </summary>
        public static string GenerateActivateCode()
        {
            return GenerateRandomCode(8);
        }

        /// <summary>
        /// Generate product code (6 characters)
        /// </summary>
        public static string GenerateProductCode()
        {
            return GenerateRandomCode(6);
        }

        /// <summary>
        /// Generate order code (8 characters)
        /// </summary>
        public static string GenerateOrderCode()
        {
            return GenerateRandomCode(8);
        }

        private static string GenerateRandomCode(int length)
        {
            var result = new StringBuilder(length);
            var buffer = new byte[length];

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(buffer);
            }

            for (int i = 0; i < length; i++)
            {
                var index = buffer[i] % AllowedChars.Length;
                result.Append(AllowedChars[index]);
            }

            return result.ToString();
        }
    }
}
