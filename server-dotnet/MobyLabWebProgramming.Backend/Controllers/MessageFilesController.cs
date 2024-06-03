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
    private readonly IFileService _fileService;
    public MessageFilesController(IUserService userService, IFileService fileService) : base(userService)
    {
        _fileService = fileService;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse<FilesAddedDTO>>> AddFilesTopicMessage([FromForm] FilesAddDTO files)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _fileService.SaveFiles(files, false)) :
            this.ErrorMessageResult<FilesAddedDTO>(currentUser.Error);
    }
}
