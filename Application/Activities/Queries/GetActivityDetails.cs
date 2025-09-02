using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<ActivityDTO>>
    {
        public required string Id { get; set; }
    };

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Query, Result<ActivityDTO>>
    {
        public async Task<Result<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities
            // .Include(x => x.Attendees)
            // .ThenInclude(x => x.User)
            .ProjectTo<ActivityDTO>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (activity == null || string.IsNullOrEmpty(activity.Id))
            {
                return Result<ActivityDTO>.Failure("Activity Not Found", 404);
            }
            return Result<ActivityDTO>.Success(mapper.Map<ActivityDTO>(activity));
        }
    }
}
