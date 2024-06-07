using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Web;
namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class ContactFormService : IContactFormService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly IValidationService _validationService;

    public ContactFormService(IRepository<WebAppDatabaseContext> repository, IValidationService validationService)
    {
        _repository = repository;
        _validationService = validationService;
    }

    public async Task<ServiceResponse<PagedResponse<ContactFormDTO>>> GetContactForms(PaginationSearchQueryParams pagination, UserDTO? _requestingUser, CancellationToken cancellationToken = default)
    {
        if (_requestingUser == null)
        {
            return ServiceResponse<PagedResponse<ContactFormDTO>>.FromError(CommonErrors.UserNotFound);
        }

        if (_requestingUser.Role == UserRoleEnum.Client)
        {
            return ServiceResponse<PagedResponse<ContactFormDTO>>.FromError(CommonErrors.NotFromStaff);
        }

        var result = await _repository.PageAsync(pagination, new ContactFormProjectionSpec(), cancellationToken);

        return ServiceResponse<PagedResponse<ContactFormDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> UpdateChecked(ContactFormUpdateDTO form, UserDTO? _requestingUser, CancellationToken cancellationToken = default)
    {
        if (form == null)
        {
            return ServiceResponse.FromError(CommonErrors.BadRequets);
        }

        if (_requestingUser == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        if (_requestingUser.Role == UserRoleEnum.Client)
        {
            return ServiceResponse<PagedResponse<ContactFormDTO>>.FromError(CommonErrors.NotFromStaff);
        }

        var currForm = await _repository.GetAsync(new ContactformSpec(form.ContactId), cancellationToken);

        if (currForm == null)
        {
            return ServiceResponse.FromError(CommonErrors.ContactNotFound);
        }

        currForm.isChecked = form.Check;

        await _repository.UpdateAsync(currForm, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
    public async Task<ServiceResponse> AddContactForm(ContactFormAddDTO form, CancellationToken cancellationToken = default)
    {
        if (form == null || form.Name.IsNullOrEmpty() || form.Email.IsNullOrEmpty() || form.Message.IsNullOrEmpty())
        {
            return ServiceResponse.FromError(CommonErrors.BadRequets);
        }

        form.Name = form.Name.Trim();

        if (form.Name.Length < 2 || form.Name.Length > 255)
        {
            return ServiceResponse.FromError(CommonErrors.BadName);
        }

        form.Message = form.Message.Trim();

        if (form.Message.Length < 1 || form.Message.Length > 4095)
        {
            return ServiceResponse.FromError(CommonErrors.BadMessage);
        }

        if (!_validationService.VerifyEmail(form.Email) || form.Email.Length > 255)
        {
            return ServiceResponse.FromError(CommonErrors.BadEmail);
        }

        await _repository.AddAsync(new ContactForms()
        {
            Name = form.Name,
            Email = form.Email,
            Message = form.Message,
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}