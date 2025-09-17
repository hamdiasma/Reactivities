using System;
using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Activities.Cammands;

public class EditComment
{
    public class Cammand : IRequest<Result<CommentDTO>>
    {
        public required string Body { get; set; }
        public required string UserId { get; set; }
        public required string CommentId { get; set; }
        public required string ActivityId { get; set; }
    }

    public class Handler(IUserAccessor userAccessor, AppDbContext dbContext, IMapper mapper) 
        : IRequestHandler<Cammand, Result<CommentDTO>>
    {
        public async Task<Result<CommentDTO>> Handle(Cammand request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities
                .Include(x => x.Comments)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);

            if (activity == null) 
                return Result<CommentDTO>.Failure("Activity not found", 404);

            var user = await userAccessor.GetUserAsync();
            if (user.Id != request.UserId) 
                return Result<CommentDTO>.Failure("You can modify only your own comments", 400);

            var oldComment = await dbContext.Comments
                .Include(c => c.User)
                .FirstOrDefaultAsync(x => x.Id == request.CommentId && x.ActivityId == request.ActivityId, cancellationToken);

            if (oldComment == null)
                return Result<CommentDTO>.Failure("Comment not found", 404);

            // ✅ Update existing comment instead of creating new
            oldComment.Body = request.Body;
            oldComment.UpdateAt = DateTime.UtcNow; // optional if you track updates
            
            var result = await dbContext.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? Result<CommentDTO>.Success(mapper.Map<CommentDTO>(oldComment))
                : Result<CommentDTO>.Failure("Failed to update comment", 500);
        }
    }
}
