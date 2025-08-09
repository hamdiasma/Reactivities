using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence.Application;

namespace Application.Activities.Cammands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    };
    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FindAsync([request.Activity.ID], cancellationToken)
            ?? throw new Exception($"Activity with ID {request.Activity.ID} not found.")
            ;
            // Update the activity properties
            mapper.Map(request.Activity, activity);
            await dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
