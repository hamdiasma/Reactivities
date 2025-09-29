using System;

namespace Application.Activities.DTOs;

public class BaseActivityDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Category { get; set; } = string.Empty;
    public bool IsCancelled { get; set; }
    // location
    public string City { get; set; } = string.Empty;
    public string Venue { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Langitude { get; set; }
    public int? NumberOfParicipate { get; set; } = 1;
}
