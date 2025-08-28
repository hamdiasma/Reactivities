using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Application;

public class AppDbContext(DbContextOptions<AppDbContext> options) :IdentityDbContext<User, Role, string>(options)
{
    public virtual DbSet<Activity> Activities { get; set; }
}

