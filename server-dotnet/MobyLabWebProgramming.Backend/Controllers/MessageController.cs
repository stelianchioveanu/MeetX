﻿using Microsoft.AspNetCore.Authorization;
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
public class MessageController : AuthorizedController
{
    private readonly IMessageService _messageService;
    public MessageController(IUserService userService, IMessageService messageService) : base(userService)
    {
        _messageService = messageService;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<MessageDTO>>>> GetMessages([FromQuery] PaginationSearchQueryParams pagination, [FromQuery] MessagesGetDTO messageGet)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _messageService.GetMessages(pagination, messageGet, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<MessageDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpDelete]
    public async Task<ActionResult<RequestResponse>> DeleteMessage([FromBody] MessageDeleteDTO message)
    {
        var currentUser = await GetCurrentUserNotDTO();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _messageService.DeleteMessage(message, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}