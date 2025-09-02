using System;
using Application.Activities.DTOs;
using Application.Activities.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
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
         .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id));
    }
}
