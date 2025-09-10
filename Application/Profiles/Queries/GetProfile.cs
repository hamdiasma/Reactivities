using System;
using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Profiles.Queries;

public class GetProfile
{
    public class Query : IRequest<Result<UserProfile>>
    {
        public required string UserId { get; set; }
    }
    
    public class Handler(AppDbContext dbContext, IMapper mapper ) : IRequestHandler<Query, Result<UserProfile>>
    {
        public async Task<Result<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
        {
            // Include ➝ charge les données liées (relations) depuis EF Core.
            // Select ➝ tu choisis manuellement les champs/propriétés à récupérer.
            // ProjectTo ➝ fait comme un Select, mais automatiquement en utilisant la configuration AutoMapper
            var profile =  await dbContext.Users
            .ProjectTo<UserProfile>(mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);
      

            if (profile == null) return Result<UserProfile>.Failure("User not found", 404);
           
            return Result<UserProfile>.Success(profile);
        }
    }
}
