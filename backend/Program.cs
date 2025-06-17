using backend.Extensions;
using backend.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices();

var app = builder.Build();

app.UseCors("AllowLocalhost3000");

// Ensure the DB is created
app.EnsureDbCreated();

// Register endpionts
app.MapTaskEndpoints();
app.MapWorkerEndpoints();

app.Run();
