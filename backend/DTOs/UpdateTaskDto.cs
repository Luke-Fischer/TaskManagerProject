using backend.Models;

namespace backend.DTOs
{
    public class UpdateTaskDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public StatusOfTask? Status { get; set; }
        public int? WorkerId { get; set; }
    }
}
