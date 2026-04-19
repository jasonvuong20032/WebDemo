using System.ComponentModel.DataAnnotations.Schema;

namespace JapaneseFood.Entity.Product
{
    [Table("ProductViews")]
    public class ProductViewEntities
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public int View { get; set; }
    }
}
