using System;
using Application.Profiles.DTOs;

namespace Application.Activities.DTOs;

public class ActivityDTO
{

    public required string Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required DateTime Date { get; set; } = DateTime.UtcNow;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
       
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }
    public int NumberOfParicipate { get; set; }
    public required string HostDisplayName { get; set; }
    public required string HostId { get; set; }
    // location
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Langitude { get; set; }
    
    // navigation proprerities
    public ICollection<UserProfile> Attendees { get; set; } = [];//many to many
}
