using JapaneseFood.Entity.Product;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Entity.Image
{
    [Table("Images")]
    public class ImageEntities
    {
        public int Id { get; set; }
        public long ProductId { get; set; }
        public required string ImageUrl { get; set; }
        public string Alt { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int SortOrder { get; set; }
        public ProductEntities Product { get; set; } = null!;
    }
}
