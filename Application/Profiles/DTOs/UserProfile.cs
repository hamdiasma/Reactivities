using System;

namespace Application.Profiles.DTOs
{
    public class UserProfile
    {
        public required string Id { get; set; }
        public required string DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? ImageUrl { get; set; }

        public bool Following { get; set; }

        public int FollowerSCount { get; set; }
        public int FollowingSCount { get; set; }
    }
}
