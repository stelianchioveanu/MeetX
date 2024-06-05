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

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class TopicService : ITopicService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly IFileService _fileService;

    public TopicService(IRepository<WebAppDatabaseContext> repository, IFileService fileService)
    {
        _repository = repository;
        _fileService = fileService;
    }

    public async Task<ServiceResponse> AddTopic(TopicAddDTO topic, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        if (topic == null || topic.Title.IsNullOrEmpty() || topic.Description.IsNullOrEmpty())
        {
            return ServiceResponse.FromError(CommonErrors.BadRequets);
        }

        topic.Title = topic.Title.Trim();
        topic.Description = topic.Description.Trim();

        if (topic.Description.Length < 1 || topic.Description.Length > 4095)
        {
            return ServiceResponse.FromError(CommonErrors.BadDescription);
        }

        if (topic.Title.Length < 1 || topic.Title.Length > 4095)
        {
            return ServiceResponse.FromError(CommonErrors.BadTitle);
        }

        var entity = await _repository.GetAsync(new GroupSpec(topic.GroupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse.FromError(CommonErrors.GroupNotFound);
        }

        if (!entity.Users.Contains(requestingUser) && !entity.Admins.Contains(requestingUser))
        {
            return ServiceResponse.FromError(CommonErrors.NotMember);
        }

        var newTopic = new Topic
        {
            Title = topic.Title,
            Description = topic.Description,
            UserId = requestingUser.Id,
            GroupId = topic.GroupId,
        };

        newTopic = await _repository.AddAsync(newTopic, cancellationToken);

        await _fileService.SaveFiles(new FilesAddDTO { TopicId = newTopic.Id, PrivateConversationId = Guid.Empty, Files = topic.Files, Images = topic.Images }, true, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<TopicDTO>> GetTopic(TopicGetDTO topic, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<TopicDTO>.FromError(CommonErrors.UserNotFound);
        }

        var entity = await _repository.GetAsync(new GroupSpec(topic.GroupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse<TopicDTO>.FromError(CommonErrors.GroupNotFound);
        }

        if (!entity.Users.Contains(requestingUser) && !entity.Admins.Contains(requestingUser))
        {
            return ServiceResponse<TopicDTO>.FromError(CommonErrors.NotMember);
        }

        var result = await _repository.GetAsync(new TopicProjectionSpec(topic.TopicId));
        if (result == null)
        {
            return ServiceResponse<TopicDTO>.FromError(CommonErrors.TopicNotFound);
        }

        var recent = await _repository.GetAsync(new UserRecentTopicsSpec(requestingUser.Id, topic.TopicId), cancellationToken);

        if (recent == null)
        {
            await _repository.AddAsync(new UserRecentTopics
            {
                UserId = requestingUser.Id,
                TopicId = topic.TopicId,
            }, cancellationToken);
        }
        else
        {
            await _repository.UpdateAsync(recent, cancellationToken);
        }

        return ServiceResponse<TopicDTO>.ForSuccess(result);
    }

    public async Task<ServiceResponse<PagedResponse<TopicDTO>>> GetTopics(PaginationSearchQueryParams pagination, Guid groupId, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<PagedResponse<TopicDTO>>.FromError(CommonErrors.UserNotFound);
        }

        var entity = await _repository.GetAsync(new GroupSpec(groupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse<PagedResponse<TopicDTO>>.FromError(CommonErrors.GroupNotFound);
        }

        if (!entity.Users.Contains(requestingUser) && !entity.Admins.Contains(requestingUser))
        {
            return ServiceResponse<PagedResponse<TopicDTO>>.FromError(CommonErrors.NotMember);
        }

        var result = await _repository.PageAsync(pagination, new TopicProjectionSpec(pagination.Search, groupId), cancellationToken);

        return ServiceResponse<PagedResponse<TopicDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<PagedResponse<TopicDTO>>> GetMyTopics(PaginationSearchQueryParams pagination, Guid groupId, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<PagedResponse<TopicDTO>>.FromError(CommonErrors.UserNotFound);
        }

        var entity = await _repository.GetAsync(new GroupSpec(groupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse<PagedResponse<TopicDTO>>.FromError(CommonErrors.GroupNotFound);
        }

        if (!entity.Users.Contains(requestingUser) && !entity.Admins.Contains(requestingUser))
        {
            return ServiceResponse<PagedResponse<TopicDTO>>.FromError(CommonErrors.NotMember);
        }

        var result = await _repository.PageAsync(pagination, new TopicProjectionSpec(pagination.Search, groupId, requestingUser.Id), cancellationToken);

        return ServiceResponse<PagedResponse<TopicDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<PagedResponse<TopicDTO>>> GetRecentTopics(PaginationSearchQueryParams pagination, Guid groupId, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<PagedResponse<TopicDTO>>.FromError(CommonErrors.UserNotFound);
        }

        var entity = await _repository.GetAsync(new GroupSpec(groupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse<PagedResponse<TopicDTO>>.FromError(CommonErrors.GroupNotFound);
        }

        if (!entity.Users.Contains(requestingUser) && !entity.Admins.Contains(requestingUser))
        {
            return ServiceResponse<PagedResponse<TopicDTO>>.FromError(CommonErrors.NotMember);
        }

        var result = await _repository.PageAsync(pagination, new UserRecentTopicsProjectionSpec(groupId, requestingUser.Id), cancellationToken);

        return ServiceResponse<PagedResponse<TopicDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse> DeleteTopic(TopicDeleteDTO topic, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        var entity = await _repository.GetAsync(new GroupSpec(topic.GroupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse.FromError(CommonErrors.GroupNotFound);
        }

        var entity2 = await _repository.GetAsync(new TopicSpec(topic.TopicId), cancellationToken);

        if (entity2 == null)
        {
            return ServiceResponse.FromError(CommonErrors.TopicNotFound);
        }

        if (!entity.Admins.Contains(requestingUser))
        {
            return ServiceResponse<PagedResponse<TopicDTO>>.FromError(CommonErrors.NotAnAdmin);
        }
        

        await _repository.DeleteAsync(new TopicSpec(entity2.Id), cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
