using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.DTOs;

namespace backend.Validation;

public static class TaskItemValidator
{
    public static async Task<(bool IsValid, string? ErrorMessage)> ValidateAsync(TaskItem task, AppDbContext db)
    {
        var titleError = ValidateTitle(task.Title);
        if (titleError != null)
        {
            return (false, titleError);
        }

        var descError = ValidateDescription(task.Description);
        if (descError != null)
        {
            return (false, descError);
        }

        if (!Enum.IsDefined(typeof(StatusOfTask), task.Status))
        {
            return (false, "Invalid status value.");
        }

        if (task.WorkerId.HasValue)
        {
            var exists = await db.Workers.AnyAsync(w => w.Id == task.WorkerId);
            if (!exists)
                return (false, "Assigned worker does not exist.");
        }

        return (true, null);
    }

    public static async Task<(bool IsValid, string? ErrorMessage)> ValidateUpdateAsync(UpdateTaskDto dto, AppDbContext db)
    {
        if (dto.Title != null)
        {
            var titleError = ValidateTitle(dto.Title);
            if (titleError != null)
            {
                return (false, titleError);
            }
        }

        if (dto.Description != null)
        {
            var descError = ValidateDescription(dto.Description);
            if (descError != null)
            {
                return (false, descError);
            }
        }

        if (dto.Status.HasValue && !Enum.IsDefined(typeof(StatusOfTask), dto.Status.Value))
        {
            return (false, "Invalid status value.");
        }

        if (dto.WorkerId.HasValue)
        {
            var exists = await db.Workers.AnyAsync(w => w.Id == dto.WorkerId.Value);
            if (!exists)
            {
                return (false, "Assigned worker does not exist.");
            }
        }

        return (true, null);
    }

    private static string? ValidateTitle(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            return "Title is required.";
        }
        return null;
    }

    private static string? ValidateDescription(string description)
    {
        if (string.IsNullOrWhiteSpace(description))
        {
            return "Description is required.";
        }
        return null;
    }
}

