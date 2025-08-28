using System;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Application;

public class DbInitilizer
{
    public static async Task SeedData(AppDbContext context, UserManager<User> userManager)
    {

        // if (!userManager.Users.Any())
        // {

        //    var users = new List<User>()
        //   {
        //     new(){
        //         DisplayName="Hamdi",
        //         UserName="hamdi.babdelhafidh@gmail.com",
        //         Email="hamdi.babdelhafidh@gmail.com",
        //     },
        //     new(){
        //         DisplayName="Achek",
        //         UserName="kapunain2009@gmail.com",
        //         Email="kapunain2009@gmail.com",
        //     },
        //     new(){
        //         DisplayName="Ben",
        //         UserName="hamdi.achek9.11.1987@gmail.com",
        //         Email="hamdi.achek9.11.1987@gmail.com"
        //     }
        //  };

        //     foreach (var user in users)
        //     {
        //         await userManager.CreateAsync(user, "Pa$$w0rd");
        //      }
          
        // }


        if (await context.Activities.AnyAsync()) return;
        var activities = new List<Activity>
        {
            new()
            {
                Title = "Past Activity",
                Description = "Activity 1",
                Date = DateTime.Now.AddMonths(-2),
                Category = "drinks",
                IsCancelled = false,
                City = "London",
                Venue = "Pub",
                Latitude = 51.5074,
                Langitude = -0.1278 // Changed from Langitude
            },
            new()
            {
                Title = "Future Activity",
                Description = "Activity 2",
                Date = DateTime.Now.AddMonths(2),
                Category = "culture",
                IsCancelled = false,
                City = "Paris",
                Venue = "Louvre",
                Latitude = 48.8566,
                Langitude = 2.3522 // Changed from Langitude
            },
            new()
            {
                Title = "Future Activity 2",
                Description = "Activity 3",
                Date = DateTime.Now.AddMonths(3),
                Category = "music",
                IsCancelled = false,
                City = "Berlin",
                Venue = "Concert Hall",
                Latitude = 52.5200,
                Langitude = 13.4050 // Changed from Langitude
            }
        };

        await context.Activities.AddRangeAsync(activities);
        await context.SaveChangesAsync();
    }

}
