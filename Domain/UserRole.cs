using System;
using Microsoft.AspNetCore.Identity;

namespace Domain;

public class UserRole : IdentityUserRole<string>
{
    public required User User { get; set; }
    public required Role Role { get; set; }
}
