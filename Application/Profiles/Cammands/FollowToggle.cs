using System;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence.Application;

namespace Application.Profiles.Cammands;

public class FollowToggle
{
    public class Cammand : IRequest<Result<Unit>>
    {
        public required string FolloweeUserId { get; set; }
    }

    public class Handler(AppDbContext dbContext, IUserAccessor userAccessor) : IRequestHandler<Cammand, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Cammand request, CancellationToken cancellationToken)
        {
            var follower = await userAccessor.GetUserAsync();
            var followee = await dbContext.Users.FindAsync([request.FolloweeUserId], cancellationToken);

            if (followee == null)
            {
                return Result<Unit>.Failure("target user not found!", 400);
            }

            var following = await dbContext.UserFollowings
            .FindAsync([follower.Id, followee.Id], cancellationToken);

            if (following == null)
            {
                dbContext.UserFollowings.Add(new UserFollowing
                {
                    FollowerId = follower.Id,
                    FolloweeId = followee.Id

                });
            }
            else
            {
                dbContext.UserFollowings.Remove(following);
            }

            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

            return result ?
             Result<Unit>.Success(Unit.Value)
             : Result<Unit>.Failure("Problem update following", 500);

        }
    }
}
