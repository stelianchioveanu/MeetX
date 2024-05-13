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
using System.Globalization;
using System.Text.RegularExpressions;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class MessageService : IMessageService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;

    public MessageService(IRepository<WebAppDatabaseContext> repository)
    {
        _repository = repository;
    }

    public async Task<ServiceResponse<MessageDTO>> AddMessage(MessageAddDTO message, Guid? userId, CancellationToken cancellationToken = default)
    {
        if (userId == null || userId == Guid.Empty)
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.BadRequets);
        }
        if (message == null || message.Text.IsNullOrEmpty())
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.BadRequets);
        }

        message.Text = message.Text.Trim();

        if (message.Text.Length < 1)
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.BadInput);
        }

        var entity = await _repository.GetAsync(new GroupSpec(message.GroupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.GroupNotFound);
        }

        var topic = await _repository.GetAsync(new TopicSpec(message.TopicId), cancellationToken);

        if (topic == null || topic.GroupId != message.GroupId)
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.TopicNotFound);
        }

        if (entity.Users.All(e => e.Id != userId))
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.NotMember);
        }

        var newMessage = new Message
        {
            UserId = (Guid)userId,
            Text = message.Text,
            TopicId = message.TopicId,
        };

        newMessage = await _repository.AddAsync(newMessage, cancellationToken);

        var messageDTO = new MessageDTO
        {
            Id = newMessage.Id,
            Text = newMessage.Text,
            CreatedDate = DateTime.Parse(newMessage.CreatedAt.ToLocalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
            User = new UserDTO
            {
                Id = newMessage.User.Id,
                Email = newMessage.User.Email,
                Name = newMessage.User.Name,
                Role = newMessage.User.Role
            },
            GroupId = newMessage.Topic.GroupId,
            TopicId = newMessage.Topic.Id,
        };

        return ServiceResponse<MessageDTO>.ForSuccess(messageDTO);
    }

    public async Task<ServiceResponse<PagedResponse<MessageDTO>>> GetMessages(PaginationSearchQueryParams pagination, MessagesGetDTO messagesGet, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<PagedResponse<MessageDTO>>.FromError(CommonErrors.UserNotFound);
        }

        var entity = await _repository.GetAsync(new GroupSpec(messagesGet.GroupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse<PagedResponse<MessageDTO>>.FromError(CommonErrors.GroupNotFound);
        }

        if (!entity.Users.Contains(requestingUser))
        {
            return ServiceResponse<PagedResponse<MessageDTO>>.FromError(CommonErrors.NotMember);
        }

        var topic = await _repository.GetAsync(new TopicSpec(messagesGet.TopicId), cancellationToken);

        if (topic == null)
        {
            return ServiceResponse<PagedResponse<MessageDTO>>.FromError(CommonErrors.TopicNotFound);
        }

        var message = await _repository.GetAsync(new MessageSpec(messagesGet.LastMessageId), cancellationToken);

        if (message == null)
        {
            var result = await _repository.PageAsync(pagination, new MessageProjectionSpec(messagesGet.TopicId), cancellationToken);
            return ServiceResponse<PagedResponse<MessageDTO>>.ForSuccess(result);
        } else
        {
            var result = await _repository.PageAsync(pagination, new MessageProjectionSpec(messagesGet.TopicId, message), cancellationToken);
            Console.WriteLine(message.Text);
            return ServiceResponse<PagedResponse<MessageDTO>>.ForSuccess(result);
        }
    }

    public async Task<ServiceResponse> DeleteMessage(MessageDeleteDTO message, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        var entity = await _repository.GetAsync(new GroupSpec(message.GroupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse.FromError(CommonErrors.GroupNotFound);
        }

        var entity2 = await _repository.GetAsync(new TopicSpec(message.TopicId), cancellationToken);

        if (entity2 == null)
        {
            return ServiceResponse.FromError(CommonErrors.TopicNotFound);
        }

        var entity3 = await _repository.GetAsync(new MessageSpec(message.Id), cancellationToken);

        if (entity3 == null)
        {
            return ServiceResponse.FromError(CommonErrors.MessageNotFound);
        }

        if (requestingUser.Id != entity3.UserId)
        {
            return ServiceResponse.FromError(CommonErrors.NotMessageCreator);
        }

        await _repository.DeleteAsync(new MessageSpec(entity3.Id), cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
