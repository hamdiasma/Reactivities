
using API.Extensions;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddCustomServices(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi();
// }

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthorization();
app.UseCors();
app.MapControllers();
using var scope = app.Services.CreateScope();
var servives = scope.ServiceProvider;
try
{
    var context = servives.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitilizer.SeedData(context);
}
catch (Exception ex)
{

    var logger = servives.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
    throw;
}

app.Run();
