using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Entity.Article
{
    [Table("Catalogs")]
    public class CatalogEntities : BaseEntities
    {
        public required string Name { get; set; }
    }
}
