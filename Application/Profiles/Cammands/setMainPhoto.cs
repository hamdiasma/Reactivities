using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Persistence.Application;

namespace Application.Profiles.Cammands;

public class SetMainPhoto
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string PhotoId { get; set; }
    }

    public class Handler(AppDbContext dbContext , IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserWithPhotosAsync();
            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);
            if (photo == null) return Result<Unit>.Failure("Photo not found", 404);
            user.ImageUrl = photo.Url;
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem setting main photo", 500);
        }
    }

}
