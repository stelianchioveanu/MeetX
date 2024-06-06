using Microsoft.AspNetCore.Http;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IContactFormService
{
    public Task<ServiceResponse<PagedResponse<ContactFormDTO>>> GetContactForms(PaginationSearchQueryParams pagination, UserDTO? _requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateChecked(ContactFormUpdateDTO form, UserDTO? _requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddContactForm(ContactFormAddDTO form, CancellationToken cancellationToken = default);
}
