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
public class GroupController : AuthorizedController
{
    private readonly IGroupService _groupService;
    public GroupController(IUserService userService, IGroupService groupService) : base(userService)
    {
        _groupService = groupService;

    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> AddGroup([FromBody] GroupAddDTO group)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.AddGroup(group, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<GroupDTO>>>> GetGroups([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.GetGroups(pagination, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<GroupDTO>>(currentUser.Error);
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<GroupDTO>>>> GetPublicGroups([FromQuery] PaginationSearchQueryParams pagination)
    {
        return this.FromServiceResponse(await _groupService.GetPublicGroups(pagination));
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<GroupLinkResponse>>> GetInviteLink([FromQuery] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.GenerateLink(id, currentUser.Result)) :
            this.ErrorMessageResult<GroupLinkResponse>(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> JoinGroup([FromBody] JoinGroupDTO joinGroup)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.JoinGroup(joinGroup, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> LeaveGroup([FromBody] LeaveGroupDTO leaveGroup)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.LeaveGroup(leaveGroup, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> ChangeRole([FromBody] ChangeRoleDTO change)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.ChangeRole(change, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<GroupMemberDTO>>>> GetGroupMembers([FromQuery] PaginationSearchQueryParams pagination, [FromQuery] Guid groupId)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.GetGroupMembers(pagination, groupId, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<GroupMemberDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<GroupGetDTO>>> GetGroup([FromQuery] Guid groupId)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.GetGroup(groupId, currentUser.Result)) :
            this.ErrorMessageResult<GroupGetDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> RemoveMember([FromBody] RemoveMemberDTO remove)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.RemoveMember(remove, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete]
    public async Task<ActionResult<RequestResponse>> DeleteGroup([FromBody] Guid groupId)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.DeleteGroup(groupId, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<GroupMemberDTO>>> GetMember([FromQuery] Guid groupId, [FromQuery] Guid userId)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.GetGroupMember(groupId, userId, currentUser.Result)) :
            this.ErrorMessageResult<GroupMemberDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<GroupDetailsDTO>>> GetGroupDetails([FromQuery] Guid groupId)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.GetGroupDetails(groupId, currentUser.Result)) :
            this.ErrorMessageResult<GroupDetailsDTO>(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> UpdateGroupName([FromBody] GroupNameUpdateDTO group)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _groupService.UpdateGroupName(group, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}
