using backend.Data;

namespace backend.Extensions
{
    public static class DatabaseExtensions
    {
        public static void EnsureDbCreated(this IHost app)
        {
            using var scope = app.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.EnsureCreated();
        }
    }
}
