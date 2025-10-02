using System;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Profiles.Queries;

public class GetUserMonthlyActivities
{
    public class Query : IRequest<Result<List<UserActivityDTO>>>
    {
        public required string UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDTO>>>
    {
        public async Task<Result<List<UserActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = dbContext.ActivityAttendees
            .Where(u => u.User.Id == request.UserId)
            .OrderBy(a => a.Activity.Date)
            .Select(x => x.Activity)
            .AsQueryable();

            var today = DateTime.UtcNow;

            query = query.Where(a => a.Date >= request.StartDate && a.Date <= request.EndDate && a.Attendees.Any(x => x.UserId == request.UserId));

            var projectedActivities = query.ProjectTo<UserActivityDTO>(mapper.ConfigurationProvider);
            var totalCount = await projectedActivities.CountAsync(cancellationToken);

            var activities = await projectedActivities
                  .ToListAsync(cancellationToken);

            return Result<List<UserActivityDTO>>.Success(activities);
        }
    }
}
