using System;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using Application.DTOs;
using AutoMapper;
using Domain;
using Humanizer;

namespace Application.Core;

public class MappingProfiles : Profile
{
  public MappingProfiles()
  {

    string? currentUserId = null;

    CreateMap<Activity, Activity>();
    CreateMap<CreateActivityDto, Activity>(); // source => distination
    CreateMap<EditActivityDto, Activity>(); // source => distination
    CreateMap<Activity, ActivityDTO>()
    .ForMember(d => d.HostDisplayName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName)) // o:source
    .ForMember(d => d.HostId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));
    CreateMap<ActivityAttendee, UserProfile>()
     .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
     .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
     .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
     .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
     .ForMember(d => d.FollowerSCount, o => o.MapFrom(s => s.User.Followers.Count))
    .ForMember(d => d.FollowingSCount, o => o.MapFrom(s => s.User.Followings.Count))
      .ForMember(d => d.Following, o => o.MapFrom(s => s.User.Followers.Any(x => x.Follower.Id == currentUserId))); ;
    CreateMap<User, UserProfile>()
    .ForMember(d => d.FollowerSCount, o => o.MapFrom(s => s.Followers.Count))
    .ForMember(d => d.FollowingSCount, o => o.MapFrom(s => s.Followings.Count))
    .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x => x.Follower.Id == currentUserId)));

    CreateMap<Comment, CommentDTO>()
    .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
    .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
    .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));

    CreateMap<Activity, UserActivityDTO>();
  }
}
