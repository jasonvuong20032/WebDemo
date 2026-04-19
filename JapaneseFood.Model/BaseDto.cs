namespace JapaneseFood.Model
{
    public class BaseDto
    {
        public long Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string? CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }
        public bool IsActive { get; set; } = true;
        public bool IsDelete { get; set; }
    }
}
