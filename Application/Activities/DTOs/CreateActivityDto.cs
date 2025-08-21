using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Activities.DTOs;

public class CreateActivityDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public  DateTime Date { get; set; } = DateTime.UtcNow;
    public  string Category { get; set; } = string.Empty;
    public  bool IsCancelled { get; set; }
    // location
    public  string City { get; set; } = string.Empty;
    public  string Venue { get; set; } = string.Empty;
    public  double Latitude { get; set; }
    public  double Langitude { get; set; }
}
