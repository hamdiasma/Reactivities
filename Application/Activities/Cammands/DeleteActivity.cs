using System;
using Application.Core;
using MediatR;
using Persistence.Application;

namespace Application.Activities.Cammands;

public class DeleteActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string ID { get; set; }
    }
    public class Handler(AppDbContext dbContext) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.ID], cancellationToken);


            if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }

            dbContext.Activities.Remove(activity);
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (!result)
            {
                return Result<Unit>.Failure("Failure to delete activity", 400);
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
