
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

public interface ITopicService
{
    public Task<ServiceResponse> AddTopic(TopicAddDTO topic, User? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<TopicDTO>> GetTopic(TopicGetDTO topic, User? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<TopicDTO>>> GetTopics(PaginationSearchQueryParams pagination, Guid groupId, User? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<TopicDTO>>> GetMyTopics(PaginationSearchQueryParams pagination, Guid groupId, User? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<TopicDTO>>> GetRecentTopics(PaginationSearchQueryParams pagination, Guid groupId, User? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteTopic(TopicDeleteDTO topic, User? requestingUser = default, CancellationToken cancellationToken = default);
}
