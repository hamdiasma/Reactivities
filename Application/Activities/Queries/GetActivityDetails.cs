using System;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<Activity>>
    {
        public required string Id { get; set; }
     };

    public class Handler(AppDbContext dbContext) : IRequestHandler<Query, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities
                 .FirstOrDefaultAsync(x => x.ID == request.Id, cancellationToken);



            if (activity == null || string.IsNullOrEmpty(activity.ID))
            {
               return Result<Activity>.Failure("Activity Not Found", 404);
            }
            return Result<Activity>.Success(activity);
        }
    }
}
