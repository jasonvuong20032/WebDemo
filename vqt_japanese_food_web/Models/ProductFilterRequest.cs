namespace vqt_japanese_food_web.Models
{
    public class ProductFilterRequest
    {
        public long? CatalogId { get; set; }
        public long? CategoryId { get; set; }

        /// <summary>
        /// newest | price_asc | price_desc
        /// </summary>
        public string? Sorting { get; set; }
        public string? Search { get; set; }
    }
}
