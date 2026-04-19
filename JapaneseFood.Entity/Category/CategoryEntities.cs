using JapaneseFood.Entity.Article;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Entity.Category
{
    [Table("Categorys")]
    public class CategoryEntities : BaseEntities
    {
        public required string Name { get; set; }
        public long CatalogId { get; set; }
        public CatalogEntities Catalog { get; set; } = null!;
    }
}
