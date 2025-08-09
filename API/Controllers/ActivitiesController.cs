using System;
using Domain;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseApiController
{


    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        var activities = await context.Activities.ToListAsync();
        if (activities == null || !activities.Any())
        {
            return NotFound("No activities found.");
        }
        return Ok(activities);
    }

     [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        if(string.IsNullOrEmpty(id)) return BadRequest("Activity ID cannot be null or empty.");

        var activity = await context.Activities.FirstOrDefaultAsync(x => x.ID == id);
        if (activity == null) return NotFound($"Activity with ID {id} not found.");
        return Ok(activity);
    }
}
