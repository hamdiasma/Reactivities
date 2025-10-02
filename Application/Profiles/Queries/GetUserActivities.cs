using System;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Profiles.Queries;

public class GetUserActivities
{
    public class Query : IRequest<Result<PageResult<UserActivityDTO>>>
    {
        public required string UserId { get; set; }
        public required string Filter { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 12;

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Query, Result<PageResult<UserActivityDTO>>>
    {
        public async Task<Result<PageResult<UserActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = dbContext.ActivityAttendees
            .Where(u => u.User.Id == request.UserId)
            .OrderBy(a => a.Activity.Date)
            .Select(x => x.Activity)
            .AsQueryable();

            var today = DateTime.UtcNow;

            query = request.Filter switch
            {
                "past" => query.Where(a => a.Date <= today && a.Attendees.Any(x => x.UserId == request.UserId)),
                "hosting" => query.Where(a => a.Attendees.Any(x => x.IsHost && x.UserId == request.UserId)),
                _ => query.Where(a => a.Date >= today && a.Attendees.Any(x => x.UserId == request.UserId))
            };

            var projectedActivities = query.ProjectTo<UserActivityDTO>(mapper.ConfigurationProvider);
            var totalCount = await projectedActivities.CountAsync(cancellationToken);

            var activities = await projectedActivities
                  .Skip((request.PageNumber - 1) * request.PageSize)
                  .Take(request.PageSize)
                  .ToListAsync(cancellationToken);


            var pagedResult = new PageResult<UserActivityDTO>
            {
                Items = activities,
                TotalCount = totalCount,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };
            return Result<PageResult<UserActivityDTO>>.Success(pagedResult);
        }
    }
}
