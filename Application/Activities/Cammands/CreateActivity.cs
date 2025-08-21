using System;
using Application.Activities.DTOs;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence.Application;

namespace Application.Activities.Cammands;

public class CreateActivity
{
    // Implementation for creating an activity will go here.
    public class Command : IRequest<string>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext dbContext, IMapper mapper, IValidator<Command> validator) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            await validator.ValidateAndThrowAsync(request, cancellationToken);
            Activity activity = mapper.Map<Activity>(request.ActivityDto);

            dbContext.Activities.Add(activity);
            await dbContext.SaveChangesAsync(cancellationToken);
            return activity.ID;
        }
    }
}