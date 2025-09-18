using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence.Application;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<User, Role, string>(options)
{
    public required virtual DbSet<Activity> Activities { get; set; }
    public required virtual DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    public required virtual DbSet<Photo> Photos { get; set; }
    public required virtual DbSet<Comment> Comments { get; set; }
    public required virtual DbSet<UserFollowing> UserFollowings { get; set; }

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

        builder.Entity<UserFollowing>(x =>
 {
     // 1️⃣ Définir la clé primaire composite : 
     // chaque relation "Follower - Followee" est unique
     // => un utilisateur ne peut pas suivre deux fois le même utilisateur
     x.HasKey(k => new { k.FollowerId, k.FolloweeId });

     // 2️⃣ Définir la relation avec le Follower (celui qui suit)
     // Un UserFollowing a un Follower (User)
     // Un User peut suivre plusieurs autres (Followings)
     x.HasOne(o => o.Follower)
      .WithMany(f => f.Followings)          // la collection des suivis de l’utilisateur
      .HasForeignKey(o => o.FollowerId)     // clé étrangère pointant vers le Follower
      .OnDelete(DeleteBehavior.Cascade);    // si le Follower est supprimé, on supprime aussi ses relations

     // 3️⃣ Définir la relation avec le Followee (celui qui est suivi)
     // Un UserFollowing a un Followee (User)
     // Un User peut être suivi par plusieurs autres (Followers)
     x.HasOne(o => o.Followee)
      .WithMany(f => f.Followers)           // la collection des abonnés de l’utilisateur
      .HasForeignKey(o => o.FolloweeId)     // clé étrangère pointant vers le Followee
      .OnDelete(DeleteBehavior.Cascade);    // si le Followee est supprimé, on supprime aussi ses relations
 });



        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );

        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            foreach (var proprety in entityType.GetProperties())
            {
                if (proprety.ClrType == typeof(DateTime))
                {
                    proprety.SetValueConverter(dateTimeConverter);
                }
            }
        }

    }
}

