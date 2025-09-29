using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Activities.Queries;

public class GetActivitiesList
{
    private const int MaxPageSize = 50;

    public class Query : IRequest<Result<PageList<ActivityDTO, DateTime?>>>
    {
        public required ActivityParams Params { get; set; }
    }

    public class Handler(AppDbContext dbContext, IUserAccessor userAccessor, IMapper mapper)
        : IRequestHandler<Query, Result<PageList<ActivityDTO, DateTime?>>>
    {
        public async Task<Result<PageList<ActivityDTO, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = dbContext.Activities
                .OrderBy(x => x.Date)
                .Where(x => x.Date >= (request.Params.Cursor ?? request.Params.StartDate))
                .AsQueryable();

            // Use strictly greater than the cursor to avoid duplicates
            if (!string.IsNullOrEmpty(request.Params.Filter))
            {
                query = request.Params.Filter switch
                {
                    "isGoing" => query.Where(x => x.Attendees.Any(a => a.UserId == userAccessor.GetUserId())),
                    "isHost" => query.Where(x => x.Attendees.Any(a => a.IsHost && (a.UserId == userAccessor.GetUserId()))),
                    _ => query
                };
            }


            var projectedActivities = query.ProjectTo<ActivityDTO>(mapper.ConfigurationProvider,
            new { currentUserId = userAccessor.GetUserId() });

            var activities = await projectedActivities
                .Take(request.Params.PageSize + 1)
                .ToListAsync(cancellationToken);


            DateTime? nextCursor = null;

            if (activities.Count > request.Params.PageSize)
            {
                nextCursor = activities.Last().Date;
                activities.RemoveAt(activities.Count - 1);
            }

            return Result<PageList<ActivityDTO, DateTime?>>.Success(new PageList<ActivityDTO, DateTime?>
            {
                Items = activities,
                NextCursor = nextCursor
            });
        }
    }
}
