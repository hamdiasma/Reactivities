using System;
using Microsoft.EntityFrameworkCore;

namespace Domain;


[Index(nameof(Date))]
public class Activity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Category { get; set; } = string.Empty;
    public bool IsCancelled { get; set; }
    public int? NumberOfParicipate { get; set; }
    public DateTime CreatedAt { get; set; } 

    // location
    public string City { get; set; } = string.Empty;
    public string Venue { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Langitude { get; set; }

    // navigation proprerities
    public ICollection<ActivityAttendee> Attendees { get; set; } = [];//many to many
    public ICollection<Comment> Comments { get; set; } = [];//one to many
}