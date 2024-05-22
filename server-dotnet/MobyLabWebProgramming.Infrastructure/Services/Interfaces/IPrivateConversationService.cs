
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IPrivateConversationService
{
    public Task<ServiceResponse<PagedResponse<PrivateConversationDTO>>> GetPrivateConversations(PaginationSearchQueryParams pagination, User? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PrivateConversationDTO>> GetPrivateConversation(Guid convId, User? requestingUser = default, CancellationToken cancellationToken = default);
    //public Task<ServiceResponse> DeleteTopic(TopicDeleteDTO topic, User? requestingUser = default, CancellationToken cancellationToken = default);
}
