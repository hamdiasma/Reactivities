using System;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;
namespace Application.Activities.Queries;

public class GetActivitiesList
{
    public class Query : IRequest<List<Activity>> {};
    public class Handler(AppDbContext dbContext) : IRequestHandler<Query, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            return  await dbContext.Activities.ToListAsync(cancellationToken);
        }
    }
}
