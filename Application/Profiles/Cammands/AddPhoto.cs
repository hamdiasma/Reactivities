
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence.Application;

namespace Application.Profiles.Cammands;

public class AddPhoto
{
    public class Command : IRequest<Result<Photo>>
    {
        public required IFormFile File { get; set; }
    }


    public class Handler(IUserAccessor userAccessor, AppDbContext dbContext, IPhotoService photoService) : IRequestHandler<Command, Result<Photo>>
    {
        public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadResult = await photoService.AddPhotoAsync(request.File);

            if (uploadResult is null) return Result<Photo>.Failure("Problem uploading photo", 400);

            var user = await userAccessor.GetUserAsync();
            var photo = new Photo
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.PublicId,
                UserId = user.Id
            };
            if (string.IsNullOrEmpty(user.ImageUrl))
            {
                user.ImageUrl = photo.Url;
            }
          
            dbContext.Photos.Add(photo); 

            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<Photo>.Success(photo)
                : Result<Photo>.Failure("Problem adding photo to user", 400);
        }
    }
}