using JapaneseFood.Model.Image;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Model.Product
{
    public class ProductImageDto
    {
        public long ProductId { get; set; }
        public List<ImageDto> Images { get; set; } = new List<ImageDto>();
        public string ImageUrl { get; set; } = string.Empty;
        public string Alt { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int SortOrder { get; set; }

        [DataType(DataType.Upload)]
        public IFormFile? PictureUpload { get; set; }

    }
}
