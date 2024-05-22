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
public class PrivateConversationController : AuthorizedController
{
    private readonly IPrivateConversationService _privateConversationService;
    public PrivateConversationController(IUserService userService, IPrivateConversationService privateConversationService) : base(userService)
    {
        _privateConversationService = privateConversationService;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<PrivateConversationDTO>>>> GetPrivateConversations([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _privateConversationService.GetPrivateConversations(pagination, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<PrivateConversationDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PrivateConversationDTO>>> GetPrivateConversation(Guid convId)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _privateConversationService.GetPrivateConversation(convId, currentUser.Result)) :
            this.ErrorMessageResult<PrivateConversationDTO>(currentUser.Error);
    }
}
