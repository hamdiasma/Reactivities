using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Activity>
    {
        public required string Id { get; set; }
     };

    public class Handler(AppDbContext dbContext) : IRequestHandler<Query, Activity>
    {
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities
                 .FirstOrDefaultAsync(x => x.ID == request.Id, cancellationToken);
            if (activity == null || string.IsNullOrEmpty(activity.ID))
            {
                throw new Exception($"Activity with ID {request.Id} not found.");
            }
            return activity;
        }
    }
}
