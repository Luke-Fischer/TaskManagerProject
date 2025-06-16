using backend.DTOs;
using backend.Models;
using backend.Data;

namespace backend.Extensions;

public static class TaskItemExtensions
{
    public static async Task<(bool success, string? error)> ApplyUpdateAsync(
        this TaskItem task,
        UpdateTaskDto dto,
        AppDbContext db)
    {
        if (dto.Title != null)
            task.Title = dto.Title;

        if (dto.Description != null)
            task.Description = dto.Description;

        if (dto.Status.HasValue)
            task.Status = dto.Status.Value;

        if (dto.WorkerId.HasValue)
        {
            var worker = await db.Workers.FindAsync(dto.WorkerId.Value);
            if (worker == null)
                return (false, "Assigned worker not found.");

            task.WorkerId = worker.Id;
            task.Assignee = worker;
        }
        else if (dto.WorkerId == null)
        {
            task.WorkerId = null;
            task.Assignee = null;
        }

        return (true, null);
    }
}
