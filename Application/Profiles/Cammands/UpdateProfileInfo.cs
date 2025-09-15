using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence.Application;

namespace Application.Profiles.Cammands;

public class UpdateProfileInfo
{
    public class Command : IRequest<Result<Unit>>
    {
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
    }
    // Handler to be implemented
    public class Handler(IUserAccessor userAccessor, AppDbContext dbContext) : IRequestHandler<Command, Result<Unit>>
    {
        // Implementation goes here
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            if (user == null) return Result<Unit>.Failure( "Unauthorised user", 401);
            
            user.DisplayName = request.DisplayName ?? user.DisplayName;
            user.Bio = request.Bio ?? user.Bio;
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            
            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating profile", 500);
        }
    }
}
