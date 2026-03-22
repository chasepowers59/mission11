using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Register DbContext with SQLite database (Bookstore.sqlite)
builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseSqlite("Data Source=Bookstore.sqlite"));

// Add CORS policy to allow requests from React frontend on localhost:3000
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        var allowedOrigins = builder.Configuration["AllowedOrigins"]?
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .ToList() ?? new List<string>();

        if (!allowedOrigins.Contains("http://localhost:3000"))
        {
            allowedOrigins.Add("http://localhost:3000");
        }

        if (!allowedOrigins.Contains("https://localhost:3000"))
        {
            allowedOrigins.Add("https://localhost:3000");
        }

        policy.WithOrigins(allowedOrigins.ToArray())
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowReact");
app.UseAuthorization();
app.MapControllers();

app.Run();
