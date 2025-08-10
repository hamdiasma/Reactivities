using System;
using MediatR;
using Persistence.Application;

namespace Application.Activities.Cammands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required string ID { get; set; }
    }
    public class Handler(AppDbContext dbContext) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.ID], cancellationToken)
             ?? throw new Exception($"Activity with ID {request.ID} not found.");
            dbContext.Activities.Remove(activity);
            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
