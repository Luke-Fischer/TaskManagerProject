using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;
using backend.Validation;

namespace backend.Endpoints
{
    public static class WorkerEndpoints
    {
        public static void MapWorkerEndpoints(this WebApplication app)
        {
            app.MapPost("/api/workers", CreateWorker);
            app.MapGet("/api/workers", GetAllWorkers);
            app.MapDelete("/api/workers/{id:int}", DeleteWorker);
        }

        private static async Task<IResult> CreateWorker(Worker worker, AppDbContext db)
        {
            var (isValid, error) = WorkerValidator.Validate(worker);
            if (!isValid)
            {
                return Results.BadRequest(new { message = error });
            }

            db.Workers.Add(worker);
            await db.SaveChangesAsync();

            return Results.Created($"/api/workers/{worker.Id}", new
            {
                message = "Worker created successfully.",
                data = worker
            });
        }

        private static async Task<IResult> GetAllWorkers(AppDbContext db)
        {
            var workers = await db.Workers.ToListAsync();
            return Results.Ok(new
            {
                message = "Fetched all workers.",
                data = workers
            });
        }

        private static async Task<IResult> DeleteWorker(int id, AppDbContext db)
        {
            var worker = await db.Workers.FindAsync(id);
            if (worker == null)
            {
                return Results.NotFound(new { message = "Worker not found." });
            }

            var fullName = $"{worker.FirstName} {worker.LastName}";

            var tasksToUpdate = await db.Tasks
                .Where(t => t.WorkerId == worker.Id)
                .ToListAsync();

            foreach (var task in tasksToUpdate)
            {
                task.WorkerId = null;
                task.Assignee = null;
            }

            db.Workers.Remove(worker);
            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                message = $"Deleted worker: {fullName}"
            });
        }
    }
}
