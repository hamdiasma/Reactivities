using System;

namespace Domain;

public class Activity
{
    public  string ID { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; } = string.Empty;
    public required string Description { get; set; } = string.Empty;
    public required DateTime Date { get; set; } = DateTime.UtcNow;
    public required string Category { get; set; } = string.Empty;
    public  bool IsCancelled { get; set; }

    // location
    public  string City { get; set; } = string.Empty;
    public  string Venue { get; set; } = string.Empty;
    public  double Latitude { get; set; }
    public  double Langitude { get; set; }
}