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
public class ContactFormController : AuthorizedController
{
    private readonly IContactFormService _contactFormService;
    public ContactFormController(IUserService userService, IContactFormService contactFormService) : base(userService)
    {
        _contactFormService = contactFormService;
    }
    
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> AddContactForm([FromBody] ContactFormAddDTO form)
    {
        return this.FromServiceResponse(await _contactFormService.AddContactForm(form));
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<ContactFormDTO>>>> GetContactForms([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _contactFormService.GetContactForms(pagination, currentUser.Result)) :
            this.ErrorMessageResult<PagedResponse<ContactFormDTO>>(currentUser.Error);
    }

    [Authorize]
    [HttpPut]
    public async Task<ActionResult<RequestResponse>> UpdateContactForm([FromBody] ContactFormUpdateDTO form)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            this.FromServiceResponse(await _contactFormService.UpdateChecked(form, currentUser.Result)) :
            this.ErrorMessageResult(currentUser.Error);
    }
}
