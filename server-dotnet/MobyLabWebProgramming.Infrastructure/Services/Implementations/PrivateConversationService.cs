using Microsoft.IdentityModel.Tokens;
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
using System.Text.RegularExpressions;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class PrivateConversationService : IPrivateConversationService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public PrivateConversationService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<PagedResponse<PrivateConversationDTO>>> GetPrivateConversations(PaginationSearchQueryParams pagination, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<PagedResponse<PrivateConversationDTO>>.FromError(CommonErrors.UserNotFound);
        }

        var result = await _repository.PageAsync(pagination, new PrivateConversationProjectionSpec(pagination.Search, requestingUser.Id), cancellationToken);

        foreach (var conv in result.Data)
        {
            if (conv.User1 != null && conv.User1.Id == requestingUser.Id)
            {
                conv.User1 = new UserDTO();
            } else if (conv.User2 != null && conv.User2.Id == requestingUser.Id)
            {
                conv.User2 = new UserDTO();
            }
        }

        return ServiceResponse<PagedResponse<PrivateConversationDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<PrivateConversationDTO>> GetPrivateConversation(Guid convId, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<PrivateConversationDTO>.FromError(CommonErrors.UserNotFound);
        }

        var result = await _repository.GetAsync(new PrivateConversationProjectionSpec(convId), cancellationToken);
        if (result == null)
        {
            return ServiceResponse<PrivateConversationDTO>.FromError(CommonErrors.ConvNotFound);
        }

        if (result.User1.Id == requestingUser.Id)
        {
            result.User1 = new UserDTO();
        } else
        {
            result.User2 = new UserDTO();
        }

        return ServiceResponse<PrivateConversationDTO>.ForSuccess(result);
    }
}
