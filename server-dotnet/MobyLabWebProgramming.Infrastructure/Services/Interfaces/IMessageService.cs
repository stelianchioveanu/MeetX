using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface IMessageService
{
    public Task<ServiceResponse<MessageDTO>> AddMessageToTopic(MessageAddDTO message, Guid? userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<MessageDTO>> AddMessageToUser(MessageAddDTO message, Guid? userId, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<MessageDTO>>> GetTopicMessages(PaginationSearchQueryParams pagination, MessagesGetDTO messagesGet, User? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<MessageDTO>>> GetPrivateMessages(PaginationSearchQueryParams pagination, MessagesGetDTO messagesGet, User? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteMessage(MessageDeleteDTO topic, User? requestingUser = default, CancellationToken cancellationToken = default);
}
