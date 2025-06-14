using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using TaskStatusEnum = backend.Models.TaskStatus;

namespace backend.Validation;

public static class TaskItemValidator
{
    public static async Task<(bool IsValid, string? ErrorMessage)> ValidateAsync(TaskItem task, AppDbContext db)
    {
        if (string.IsNullOrWhiteSpace(task.Title))
            return (false, "Title is required.");

        if (task.Title.Length > 100)
            return (false, "Title must be 100 characters or fewer.");

        if (string.IsNullOrWhiteSpace(task.Description))
            return (false, "Description is required.");

        if (task.Description.Length > 500)
            return (false, "Description must be 500 characters or fewer.");

        if (!Enum.IsDefined(typeof(TaskStatusEnum), task.Status))
            return (false, "Invalid status value.");

        if (task.WorkerId.HasValue)
        {
            var exists = await db.Workers.AnyAsync(w => w.Id == task.WorkerId);
            if (!exists)
                return (false, "Assigned worker does not exist.");
        }

        return (true, null);
    }
}
