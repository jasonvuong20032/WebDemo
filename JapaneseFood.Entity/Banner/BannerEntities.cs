using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Entity.Banner
{
    [Table("Banners")]
    public class BannerEntities : BaseEntities
    {
        public required string Title { get; set; }
        public string? ImageUrl { get; set; }
    }
}
