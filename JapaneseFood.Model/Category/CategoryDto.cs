using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Model.Category
{
    public class CategoryDto : BaseDto
    {
        public string Name { get; set; } = string.Empty;
        public long CatalogId { get; set; }
        public string CatalogName { get; set; } = string.Empty;
        public List<SelectListItem> Catalogs { get; set; } = new List<SelectListItem>();
    }
}
