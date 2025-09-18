using System;

namespace Domain;

public class UserFollowing
{
    public required string FollowerId { get; set; }
    public User Follower { get; set; } = null!; // Follower observer
    public required string FolloweeId { get; set; }
    public User Followee { get; set; } = null!; //Followee target
    
}
