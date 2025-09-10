using System;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Profiles.Queries;

public class GetPofilePhotos
{
    public class Query : IRequest<Result<ICollection<Photo>>>
    {
        public required string UserId { get; set; }
    }

    public class Handler(AppDbContext dbContext) : IRequestHandler<Query, Result<ICollection<Photo>>>
    {
        public async Task<Result<ICollection<Photo>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var photos = await dbContext.Photos
            .Where(p => p.UserId == request.UserId)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
            
            return Result<ICollection<Photo>>.Success(photos);
        }
    }
}