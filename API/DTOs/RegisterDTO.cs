using System;
using System.ComponentModel.DataAnnotations;
using Application.Activities;
using Application.Activities.Enum;

namespace API.DTOs;

public class RegisterDTO
{
    [Required(ErrorMessage = "Name is required")]
    public string DisplayName { get; set; } = string.Empty;


    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Not a valid email")]
    public string Email { get; set; } = string.Empty;


    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; } = string.Empty;

    public OptionsRole Role { get; set; } = OptionsRole.User;

}
