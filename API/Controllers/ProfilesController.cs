using Application.Profiles.Cammands;
using Application.Profiles.DTOs;
using Application.Profiles.Queries;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilesController : BaseApiController
    {
        [HttpPost("add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file)
        {
            return HandleResult(await Mediator.Send(new AddPhoto.Command { File = file }));
        }

        [HttpGet("{userId}/photos")]
        public async Task<ActionResult<List<Photo>>> GetPhoto(string userId)
        {
            return HandleResult(await Mediator.Send(new GetPofilePhotos.Query { UserId = userId }));
        }

        [HttpDelete("{photoId}/photo")]
        public async Task<ActionResult<string>> DeleteProfilePhoto(string photoId)
        {
            return HandleResult(await Mediator.Send(new DeletePhoto.Command { PhotoId = photoId }));
        }

        [HttpPut("{photoId}/setMain")]
        public async Task<ActionResult> UpdateProfilePhoto(string photoId)
        {
            return HandleResult(await Mediator.Send(new SetMainPhoto.Command { PhotoId = photoId }));
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserProfile>> GetProfile(string userId)
        {
            return HandleResult(await Mediator.Send(new GetProfile.Query { UserId = userId }));
        }


        [HttpPut("updateInfo")]
        public async Task<ActionResult> UpdateProfile(EditProfileRequestDTO profile)
        {

            return HandleResult(await Mediator.Send(new UpdateProfileInfo.Command
            {
                DisplayName = profile.DisplayName,
                Bio = profile.Bio
            }));
        }

        [HttpPost("{userId}/follow")]
        public async Task<ActionResult> FollowToggle(string userId)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Cammand
            {
                FolloweeUserId = userId
            }));
        }

        [HttpGet("{userId}/follow-list")]
        public async Task<ActionResult> GetFollowings(string userId, string predicate)
        {
            return HandleResult(await Mediator.Send(new GetFollowings.Query
            {
                UserId = userId,
                Predicate = predicate
            }));
        }

        [HttpGet("{userId}/activities")]
        public async Task<ActionResult> GetUserActivities(string userId, string filter, int pageNumber, int pageSize=12 )
        {
            return HandleResult(await Mediator.Send(new GetUserActivities.Query
            {
                UserId = userId,
                Filter = filter,
                PageNumber = pageNumber,
                PageSize = pageSize
            }));
        }

    }
}
