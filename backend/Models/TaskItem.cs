namespace backend.Models;

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public StatusOfTask Status { get; set; } = StatusOfTask.Todo;
    public int? WorkerId { get; set; }
    public Worker? Assignee { get; set; }
}