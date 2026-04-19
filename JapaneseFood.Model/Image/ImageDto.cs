using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Model.Image
{
    public class ImageDto
    {
        public int Id { get; set; }
        public long ProductId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string Alt { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int SortOrder { get; set; }
    }
}
