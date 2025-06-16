using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;
using backend.Validation;
using backend.DTOs;
using backend.Extensions;

namespace backend.Endpoints
{
    public static class TaskEndpoints
    {
        public static void MapTaskEndpoints(this WebApplication app)
        {
            app.MapPost("/api/tasks", CreateTask);
            app.MapGet("/api/tasks", GetAllTasks);
            app.MapDelete("/api/tasks/{id:int}", DeleteTask);
            app.MapPut("/api/tasks/{id:int}", UpdateTask);
        }

        // ============================
        // Task Handlers
        // ============================

        private static async Task<IResult> CreateTask(TaskItem task, AppDbContext db)
        {
            var (isValid, error) = await TaskItemValidator.ValidateAsync(task, db);
            if (!isValid)
            {
                return Results.BadRequest(new { message = error });
            }

            if (task.WorkerId.HasValue)
            {
                var assignee = await db.Workers.FindAsync(task.WorkerId.Value);
                if (assignee == null)
                    return Results.BadRequest(new { message = "Assigned worker does not exist." });

                task.Assignee = assignee;
            }

            db.Tasks.Add(task);
            await db.SaveChangesAsync();

            return Results.Created($"/api/tasks/{task.Id}", new
            {
                message = "Task created successfully.",
                data = task
            });
        }

        private static async Task<IResult> GetAllTasks(AppDbContext db)
        {
            var tasks = await db.Tasks
                .Include(t => t.Assignee)
                .ToListAsync();

            return Results.Ok(new
            {
                message = "Fetched all tasks.",
                data = tasks
            });
        }

        private static async Task<IResult> DeleteTask(int id, AppDbContext db)
        {
            var task = await db.Tasks.FindAsync(id);
            if (task == null)
            {
                return Results.NotFound(new { message = "Task not found." });
            }

            db.Tasks.Remove(task);
            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                message = $"Deleted task: {task.Title}"
            });
        }
        
        private static async Task<IResult> UpdateTask(int id, UpdateTaskDto dto, AppDbContext db)
        {
            var task = await db.Tasks.Include(t => t.Assignee).FirstOrDefaultAsync(t => t.Id == id);
            if (task == null)
                return Results.NotFound(new { message = "Task not found." });

            var (success, error) = await task.ApplyUpdateAsync(dto, db);
            if (!success)
            {
                return Results.BadRequest(new { message = error });
            }

            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                message = "Task updated successfully.",
                data = task
            });
        }
    }
}

