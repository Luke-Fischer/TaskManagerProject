using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Data;
using backend.Validation;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

//Register EF Core with SQLite
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=tasks.db"));

builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

var app = builder.Build();

//ensure the db is created
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.MapPost("/api/tasks", async (TaskItem task, AppDbContext db) =>
{
    var (isValid, error) = await TaskItemValidator.ValidateAsync(task, db);
    if (!isValid)
    {
        return Results.BadRequest(error);
    }
    db.Tasks.Add(task);
    await db.SaveChangesAsync();
    return Results.Created($"/api/tasks/{task.Id}", task);
});

app.Run();