using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Infrastructure.Services.Implementations;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class TopicController : AuthorizedController
{
    private readonly ITopicService _topicService;
    public TopicController(IUserService userService, ITopicService topicService) : base(userService)
    {
        _topicService = topicService;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> AddTopic([FromForm] TopicAddDTO topic)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _topicService.AddTopic(topic, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<TopicDTO>>> GetTopic([FromQuery] TopicGetDTO topic)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _topicService.GetTopic(topic, currentUser.Result)) :
            this.ErrorMessageResult<TopicDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<TopicDTO>>>> GetTopics([FromQuery] PaginationSearchQueryParams pagination, [FromQuery] Guid groupId)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _topicService.GetTopics(pagination, groupId, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<TopicDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<TopicDTO>>>> GetMyTopics([FromQuery] PaginationSearchQueryParams pagination, [FromQuery] Guid groupId)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _topicService.GetMyTopics(pagination, groupId, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<TopicDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<TopicDTO>>>> GetRecentTopics([FromQuery] PaginationSearchQueryParams pagination, [FromQuery] Guid groupId)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _topicService.GetRecentTopics(pagination, groupId, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<TopicDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpDelete]
    public async Task<ActionResult<RequestResponse>> DeleteTopic([FromBody] TopicDeleteDTO topic)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _topicService.DeleteTopic(topic, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}
