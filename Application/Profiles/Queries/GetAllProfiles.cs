using System;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Application;

namespace Application.Profiles.Queries;

public class GetAllProfiles
{
    public class Query : IRequest<Result<PageResult<ProfileDTO>>>
    {
        public string? Filter { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }


    public class Handler(AppDbContext dbContext, IMapper mapper) : IRequestHandler<Query, Result<PageResult<ProfileDTO>>>
    {
        public async  Task<Result<PageResult<ProfileDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {

            var query = dbContext.Users
            .Include(u=>u.UserRoles ).ThenInclude(ur=>ur.Role)
                .AsQueryable();

            if (!string.IsNullOrEmpty(request.Filter))
            {
                query = query.Where(p => p.DisplayName.Contains(request.Filter)
                  ||
                 (p.Email != null && p.Email.Contains(request.Filter))
                  ||
                 p.Bio.Contains(request.Filter)

                 );
            }
            // Order and paginate
            query = query.OrderBy(u => u.DisplayName);
            var totalCount = await query.CountAsync(cancellationToken);


            var profiles = await query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ProjectTo<ProfileDTO>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var pageResult = new PageResult<ProfileDTO>
                {
                    Items = profiles,
                    TotalCount = totalCount,
                    PageNumber = request.PageNumber,
                    PageSize = request.PageSize
                };

                return Result<PageResult<ProfileDTO>>.Success(pageResult);

        }
    }
}
