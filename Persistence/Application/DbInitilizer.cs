using System;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
namespace Persistence.Application;

public class DbInitilizer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
    {

        //     private async Task<string> EnsureRoleExists(OptionsRole optionsRole)
        // {
        //     string roleName = optionsRole.ToString();

        //     if (await roleManager.FindByNameAsync(roleName) is null)
        //     {
        //         Role role = new() { Name = roleName };
        //         await ;
        //     }

        //     return roleName;
        // }


        var roles = new List<Role>
        {
            new("User"),
            new("Admin"),
            new("Manager")
        };

       if (!roleManager.Roles.Any())
        {
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
        }

        var users = new List<User>()
          {
            new(){
                Id ="id-01",
                DisplayName="Hamdi",
                UserName="hamdi.babdelhafidh@gmail.com",
                Email="hamdi.babdelhafidh@gmail.com",
            },
            new(){
                Id ="id-02",
                DisplayName="Achek",
                UserName="kapunain2009@gmail.com",
                Email="kapunain2009@gmail.com",
            },
            new(){
                Id ="id-03",
                DisplayName="Ben",
                UserName="hamdi.achek9.11.1987@gmail.com",
                Email="hamdi.achek9.11.1987@gmail.com"
            }
         };

        if (!userManager.Users.Any())
        {
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, roles[0].ToString());
            }
        }

        // if (await context.Activities.AnyAsync()) return;
        // var activities = new List<Activity>
        // {
        //     new()
        //     {
        //         Title = "Past Activity",
        //         Description = "Activity 1",
        //         Date = DateTime.Now.AddMonths(-2),
        //         CreatedAt= DateTime.UtcNow,
        //         Category = "drinks",
        //         IsCancelled = false,
        //         City = "London",
        //         Venue = "Pub",
        //         Latitude = 51.5074,
        //         Langitude = -0.1278,
        //         Attendees=[
        //             new(){
        //                 IsHost=true,
        //                 UserId = users[0].Id
        //             },
        //              new(){
        //                 IsHost=true,
        //                 UserId = users[1].Id
        //             }
        //         ]
        //     },
        //     new()
        //     {
        //         Title = "Future Activity",
        //         Description = "Activity 2",
        //         Date = DateTime.Now.AddMonths(2),
        //         CreatedAt= DateTime.UtcNow,
        //         Category = "culture",
        //         IsCancelled = false,
        //         City = "Paris",
        //         Venue = "Louvre",
        //         Latitude = 48.8566,
        //         Langitude = 2.3522, // Changed from Langitude
        //         Attendees=[
        //             new(){
        //                 IsHost=true,
        //                 UserId = users[0].Id
        //             },
        //              new(){
        //                 IsHost=true,
        //                 UserId = users[1].Id
        //             }
        //         ]
        //     },
        //     new()
        //     {
        //         Title = "Future Activity 3",
        //         Description = "Activity 3",
        //         Date = DateTime.Now.AddMonths(3),
        //         CreatedAt= DateTime.UtcNow,
        //         Category = "music",
        //         IsCancelled = false,
        //         City = "Berlin",
        //         Venue = "Concert Hall",
        //         Latitude = 52.5200,
        //         Langitude = 13.4050, // Changed from Langitude
        //         Attendees=[
        //             new(){
        //                 IsHost=true,
        //                 UserId = users[0].Id
        //             },
        //              new(){
        //                 IsHost=true,
        //                 UserId = users[1].Id
        //             }
        //         ]
        //     }
        // };

        // await context.Activities.AddRangeAsync(activities);
        await context.SaveChangesAsync();
    }

}
