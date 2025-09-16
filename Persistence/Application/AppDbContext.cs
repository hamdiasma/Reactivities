using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Application;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<User, Role, string>(options)
{
    public required virtual DbSet<Activity> Activities { get; set; }
    public required virtual DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public required virtual DbSet<Photo> Photos { get; set; }
    public required virtual DbSet<Comment> Comments { get; set; }
    
    // use relations
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<ActivityAttendee>(x => x.HasKey(a => new { a.UserId, a.ActivityId }));
        // Définition de la relation entre ActivityAttendee et User :
        // - Un ActivityAttendee est lié à un seul User (HasOne)
        // - Un User peut avoir plusieurs Activities (WithMany)
        // - La clé étrangère utilisée est UserId (HasForeignKey)
        builder.Entity<ActivityAttendee>()
            .HasOne(x => x.User)
            .WithMany(x => x.Activities)
            .HasForeignKey(x => x.UserId);

        builder.Entity<ActivityAttendee>()
        .HasOne(x => x.Activity)
        .WithMany(x => x.Attendees)
        .HasForeignKey(x => x.ActivityId);
        
    }
}

