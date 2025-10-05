
using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application.Interfaces;
using Domain;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options=>
{
     // add authorization filter globally
  var authPolicy = new AuthorizationPolicyBuilder()
  .RequireAuthenticatedUser() // require authenticated user
  .Build();
  options.Filters.Add(new AuthorizeFilter(authPolicy)); // add authorization filter globally
});
builder.Services.AddCustomServices(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(opt =>
{
    // opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});


builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));
builder.Services.AddScoped<IPhotoService, PhotoServices>();

builder.Services.AddIdentityApiEndpoints<User>(options =>
{
    options.User.RequireUniqueEmail = true;
}).AddRoles<Role>()
.AddEntityFrameworkStores<AppDbContext>();

 builder.Services.AddAuthorizationBuilder()
     .AddPolicy("IsActiviyHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });

builder.Services.AddTransient<IAuthorizationHandler, IsHosrRequirementHandler>();

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.UseStaticFiles();
app.UseDefaultFiles();

app.UseCors();
app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();
app.MapHub<CommentHub>("/comments"); // signalR endpoint

app.MapFallbackToController("Index", "Fallback");


using var scope = app.Services.CreateScope();
var servives = scope.ServiceProvider;
try
{
    var context = servives.GetRequiredService<AppDbContext>();
    var userManager = servives.GetRequiredService<UserManager<User>>();
    var roleManager = servives.GetRequiredService<RoleManager<Role>>();
    await context.Database.MigrateAsync();
    await DbInitilizer.SeedData(context, userManager,roleManager);
}
catch (Exception ex)
{
    var logger = servives.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
    throw;
}

app.Run();
