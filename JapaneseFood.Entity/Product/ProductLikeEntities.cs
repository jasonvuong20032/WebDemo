using System.ComponentModel.DataAnnotations.Schema;

namespace JapaneseFood.Entity.Product
{
    [Table("ProductLikes")]
    public class ProductLikeEntities
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public int Like { get; set; }
    }
}
