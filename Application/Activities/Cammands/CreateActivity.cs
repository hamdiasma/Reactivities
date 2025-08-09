using System;
using Domain;
using MediatR;
using Persistence.Application;

namespace Application.Activities.Cammands;

public class CreateActivity
{
    // Implementation for creating an activity will go here.
    public class Command : IRequest<string>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext dbContext) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            dbContext.Activities.Add(request.Activity);
            await dbContext.SaveChangesAsync(cancellationToken);
            return request.Activity.ID;
        }
    }
}
