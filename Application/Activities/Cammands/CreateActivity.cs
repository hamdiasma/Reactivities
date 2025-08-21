using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence.Application;

namespace Application.Activities.Cammands;

public class CreateActivity
{
    // Implementation for creating an activity will go here.
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
           
            Activity activity = mapper.Map<Activity>(request.ActivityDto);
            dbContext.Activities.Add(activity);
           var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (!result)
            {
                return Result<string>.Failure("Failure to create activity", 400);
            }

            return  Result<string>.Success(activity.ID);
        }
    }
}