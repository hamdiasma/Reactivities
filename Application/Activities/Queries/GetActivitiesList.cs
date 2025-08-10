

using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence.Application;

namespace Application.Activities.Queries;

public class GetActivitiesList
{
    public class Query : IRequest<List<Activity>> {};
    public class Handler(AppDbContext dbContext, ILogger<GetActivitiesList> logger) : IRequestHandler<Query, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
           logger.LogInformation($"Processing activity list request at {DateTime.UtcNow}");
            return await dbContext.Activities.ToListAsync(cancellationToken);
        }
    }
}
