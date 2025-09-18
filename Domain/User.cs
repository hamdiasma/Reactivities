using System;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;
namespace Domain;

public class User : IdentityUser
{
    public string DisplayName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    //nav proprieties
    public ICollection<ActivityAttendee> Activities { get; set; } = []; //many to many

    public ICollection<Photo> Photos { get; set; } = []; //many to many

    public Collection<UserFollowing> Followings { get; set; } = [];
    public Collection<UserFollowing> Followers{ get; set; } = [];

}