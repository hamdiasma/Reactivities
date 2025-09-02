

using Application.Activities.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence.Application;

namespace Application.Activities.Queries;

public class GetActivitiesList
{
    public class Query : IRequest<List<ActivityDTO>> {};
    public class Handler(AppDbContext dbContext, ILogger<GetActivitiesList> logger, IMapper mapper) : IRequestHandler<Query, List<ActivityDTO>>
    {
        public async Task<List<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
        {
           logger.LogInformation($"Processing activity list request at {DateTime.UtcNow}");
            return await dbContext.Activities
            .ProjectTo<ActivityDTO>(mapper.ConfigurationProvider)
            .OrderByDescending(x=>x.Date).ToListAsync(cancellationToken);
        }
    }
}
