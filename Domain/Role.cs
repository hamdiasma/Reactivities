using System;
using Microsoft.AspNetCore.Identity;
namespace Domain;

public class Role : IdentityRole<string>
{
public Role() : base()
    {
        Id = Guid.NewGuid().ToString(); // 👈 Obligatoire pour éviter null
    }

    public Role(string roleName) : base(roleName)
    {
        Id = Guid.NewGuid().ToString(); // 👈 Obligatoire
    }
}
