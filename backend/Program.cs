using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;
using backend.Validation;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

// Register EF Core with SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=tasks.db"));

builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

var app = builder.Build();

// Ensure the DB is created
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Create a task
app.MapPost("/api/tasks", async (TaskItem task, AppDbContext db) =>
{
    var (isValid, error) = await TaskItemValidator.ValidateAsync(task, db);
    if (!isValid)
    {
        return Results.BadRequest(new { message = error });
    }

    db.Tasks.Add(task);
    await db.SaveChangesAsync();

    return Results.Created($"/api/tasks/{task.Id}", new
    {
        message = "Task created successfully.",
        data = task
    });
});

// Get all tasks
app.MapGet("/api/tasks", async (AppDbContext db) =>
{
    var tasks = await db.Tasks.ToListAsync();
    return Results.Ok(new
    {
        message = "Fetched all tasks.",
        data = tasks
    });
});

// Delete a Task
app.MapDelete("/api/tasks/{id:int}", async (int id, AppDbContext db) =>
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
});

// Create a worker
app.MapPost("/api/workers", async (Worker worker, AppDbContext db) =>
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
});

// Get all workers
app.MapGet("/api/workers", async (AppDbContext db) =>
{
    var workers = await db.Workers.ToListAsync();
    return Results.Ok(new
    {
        message = "Fetched all workers.",
        data = workers
    });
});

// Delete a worker
app.MapDelete("/api/workers/{id:int}", async (int id, AppDbContext db) =>
{
    var worker = await db.Workers.FindAsync(id);
    if (worker == null)
    {
        return Results.NotFound(new { message = "Worker not found." });
    }

    var fullName = $"{worker.FirstName} {worker.LastName}";

    db.Workers.Remove(worker);
    await db.SaveChangesAsync();

    return Results.Ok(new
    {
        message = $"Deleted worker: {fullName}"
    });
});

app.Run();
