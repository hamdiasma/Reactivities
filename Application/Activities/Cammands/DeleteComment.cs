using System;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Activities.Commands;
public class DeleteComment
{
    public class Command : IRequest<Result<string>>
    {
        public required string UserId { get; set; }
        public required string CommentId { get; set; }
        public required string ActivityId { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<string>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly AppDbContext _dbContext;

        public Handler(IUserAccessor userAccessor, AppDbContext dbContext)
        {
            _userAccessor = userAccessor;
            _dbContext = dbContext;
        }

        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _dbContext.Activities
                .Include(x => x.Comments)
                .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);

            if (activity == null)
                return Result<string>.Failure("Activity not found", 404);

            var user = await _userAccessor.GetUserAsync();
            if (user.Id != request.UserId)
                return Result<string>.Failure("You can delete only your own comments", 400);

            var comment = await _dbContext.Comments
                .FirstOrDefaultAsync(x =>
                    x.Id == request.CommentId && x.ActivityId == request.ActivityId,
                    cancellationToken);

            if (comment == null)
                return Result<string>.Failure("Comment not found", 404);

            // 🔹 Supprimer le commentaire
            _dbContext.Comments.Remove(comment);

            var result = await _dbContext.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<string>.Success(comment.Id)
                : Result<string>.Failure("Failed to delete comment", 500);
        }
    }
}
