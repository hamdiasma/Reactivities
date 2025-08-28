using System;
using API.DTOs;
using Application.Activities.Enum;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(
    UserManager<User> userManager,
    SignInManager<User> signInManager,
    RoleManager<Role> roleManager
) : BaseApiController
{
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDTO registerDTO)
    {
        // 1️⃣ Check if email already exists
        if (await userManager.FindByEmailAsync(registerDTO.Email) != null)
        {
            ModelState.AddModelError("DuplicateEmail", $"Email '{registerDTO.Email}' is already taken.");
            return ValidationProblem(ModelState);
        }

        // 2️⃣ Create new user
        var user = new User
        {
            DisplayName = registerDTO.DisplayName,
            Email = registerDTO.Email,
            UserName = registerDTO.Email
        };

        IdentityResult result = await userManager.CreateAsync(user, registerDTO.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
                ModelState.AddModelError(error.Code, error.Description);
            return ValidationProblem(ModelState);
        }

        // 3️⃣ Ensure role exists and assign it
        var roleName = await EnsureRoleExists(registerDTO.Role);
        await userManager.AddToRoleAsync(user, roleName);

        return Ok(new { message = "User registered successfully" });
    }

    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false)
        {
            return NoContent();
        }
        var user = await signInManager.UserManager.GetUserAsync(User);
        if (user == null) return Unauthorized();
        var roles = await userManager.GetRolesAsync(user);


        return Ok(new
        {
            user.Email,
            user.Id,
            user.ImageUrl,
            user.DisplayName,
            roles
        });
    }

    [HttpGet("logout")]

    public async Task<IActionResult> GetLogout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }
    // Helper method: ensures role exists and returns its string
    private async Task<string> EnsureRoleExists(OptionsRole optionsRole)
    {
        string roleName = optionsRole.ToString();

        if (await roleManager.FindByNameAsync(roleName) is null)
        {
            Role role = new() { Name = roleName };
            await roleManager.CreateAsync(role);
        }

        return roleName;
    }



}
