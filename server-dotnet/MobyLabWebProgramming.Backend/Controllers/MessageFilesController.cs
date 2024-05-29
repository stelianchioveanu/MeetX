using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Extensions;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;

namespace MobyLabWebProgramming.Backend.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class MessageFilesController : AuthorizedController
{
    private readonly IFileService _messageFileService;
    public MessageFilesController(IUserService userService, IFileService messageFileService) : base(userService)
    {
        _messageFileService = messageFileService;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse<FilesAddedDTO>>> AddFilesTopicMessage([FromForm] MessageFilesAddDTO files)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _messageFileService.SaveFilesMessage(files, currentUser.Result)) :
            this.ErrorMessageResult<FilesAddedDTO>(currentUser.Error);
    }
}
