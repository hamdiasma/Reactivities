using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence.Application;

namespace Application.Profiles.Cammands;

public class DeletePhoto
{
    public class Command : IRequest<Result<string>>
    {
        public required string PhotoId { get; set; }
    }
    public class Handler(IPhotoService photoService, AppDbContext dbContext , IUserAccessor userAccessor, ILogger<DeletePhoto> logger) : IRequestHandler<Command, Result<string>>
    {
        private readonly IPhotoService _photoService = photoService;

        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {      
            var user = await userAccessor.GetUserWithPhotosAsync();
            var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);
            logger.LogWarning("Attempting to delete photo with PublicId: {PublicId}", photo);
            if (photo == null) return Result<string>.Failure("Photo not found", 404);
            if(photo.Url== user.ImageUrl) return Result<string>.Failure("You cannot delete your main photo", 400);
             await _photoService.DeletePhotoAsync(photo.PublicId);
            user.Photos.Remove(photo);

            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<string>.Failure("Problem deleting photo from API", 500);
            return Result<string>.Success("Photo deleted successfully");
        }
    }
}
