using System;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence.Application;

namespace Application.Activities.Cammands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required Activity Activity { get; set; }
    };
    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Command , Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Activity.ID], cancellationToken);
           if (activity == null)
            {
                return Result<Unit>.Failure("Activity not found", 404);
            }
            // Update the activity properties
            mapper.Map(request.Activity, activity);
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (!result)
            {
                return Result<Unit>.Failure("Failure to update activity", 400);
            }
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
