using System;

namespace Application.Profiles.DTOs;

public class ProfileDTO
{
    public required string Id { get; set; }
    public required string DisplayName { get; set; }
    public required string Email { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
    public  List<string>? Roles { get; set; }   

}
