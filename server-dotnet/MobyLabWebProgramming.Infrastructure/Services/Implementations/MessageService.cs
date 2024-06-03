using Ardalis.Specification;
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

    public async Task<ServiceResponse<MessageDTO>> AddMessageToTopic(MessageAddDTO message, Guid? userId, CancellationToken cancellationToken = default)
    {
        if (userId == null || userId == Guid.Empty)
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.BadRequets);
        }
        if (message == null || message.Text == null)
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.BadRequets);
        }

        message.Text = message.Text.Trim();

        if (message.Text.Length < 1 && (message.Files == null || message.Files.Count == 0))
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

        var files = new List<FileGetDTO>();

        if (message.Files != null)
        {
            foreach (var id in message.Files)
            {
                var file =  await _repository.GetAsync(new FileSpec(id), cancellationToken);
                if (file != null && file != null) {
                    files.Add(new FileGetDTO { Name = file.Name, Path = file.Path, Type = file.Type });
                    file.MessageId = newMessage.Id;
                    await _repository.UpdateAsync(file, cancellationToken);
                } else
                {
                    return ServiceResponse<MessageDTO>.FromError(CommonErrors.FileAddError);
                }
            }
        }

        var messageDTO = new MessageDTO
        {
            Id = newMessage.Id,
            Text = newMessage.Text,
            CreatedDate = DateTime.Parse(newMessage.CreatedAt.ToLocalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
            User = new GroupMemberDTO
            {
                User = new UserDTO
                {
                    Id = newMessage.User.Id,
                    Email = newMessage.User.Email,
                    Name = newMessage.User.Name,
                    RegisteredDate = DateTime.Parse(newMessage.User.CreatedAt.ToUniversalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
                    Role = newMessage.User.Role,
                    ShortName = newMessage.User.ShortName,
                    Color = newMessage.User.Color,
                    Status = newMessage.User.Status,
                    AvatarPath = newMessage.User.AvatarPath,
                },
                isAdmin = entity.Admins.Any(e => e.Id == newMessage.User.Id),
            },
            GroupId = newMessage.Topic != null ? newMessage.Topic.GroupId : Guid.Empty,
            TopicId = newMessage.Topic != null ? newMessage.Topic.Id : Guid.Empty,
            ConvId = Guid.Empty,
            Files = files,
        };

        return ServiceResponse<MessageDTO>.ForSuccess(messageDTO);
    }

    public async Task<ServiceResponse<MessageDTO>> AddMessageToUser(MessageAddDTO message, Guid? userId, CancellationToken cancellationToken = default)
    {
        if (userId == null || userId == Guid.Empty)
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.BadRequets);
        }
        if (message == null || message.Text == null)
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.BadRequets);
        }

        if (message.UserId == Guid.Empty)
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.BadRequets);
        }

        message.Text = message.Text.Trim();

        if (message.Text.Length < 1 && (message.Files == null || message.Files.Count == 0))
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.BadInput);
        }

        var conv = await _repository.GetAsync(new PrivateConversationSpec(message.UserId, userId), cancellationToken);

        if (conv == null)
        {
            conv = await _repository.AddAsync(new PrivateConversation
            {
                User1Id = (Guid)userId,
                User2Id = message.UserId,
            }, cancellationToken);
        }

        var newMessage = new Message
        {
            UserId = (Guid)userId,
            Text = message.Text,
            ConversationId = conv.Id,
        };

        newMessage = await _repository.AddAsync(newMessage, cancellationToken);

        var files = new List<FileGetDTO>();

        if (message.Files != null)
        {
            foreach (var id in message.Files)
            {
                var file = await _repository.GetAsync(new FileSpec(id), cancellationToken);
                if (file != null && file != null)
                {
                    files.Add(new FileGetDTO { Name = file.Name, Path = file.Path, Type = file.Type });
                    file.MessageId = newMessage.Id;
                    await _repository.UpdateAsync(file, cancellationToken);
                }
                else
                {
                    return ServiceResponse<MessageDTO>.FromError(CommonErrors.FileAddError);
                }
            }
        }

        if (newMessage.User == null)
        {
            Console.WriteLine("Muie");
        }

        var user = await _repository.GetAsync(new UserSpec((Guid)userId), cancellationToken);

        if (user != null)
        {
            var messageDTO = new MessageDTO
            {
                Id = newMessage.Id,
                Text = newMessage.Text,
                CreatedDate = DateTime.Parse(newMessage.CreatedAt.ToLocalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
                User = new GroupMemberDTO
                {
                    User = new UserDTO
                    {
                        Id = user.Id,
                        Email = user.Email,
                        Name = user.Name,
                        RegisteredDate = DateTime.Parse(user.CreatedAt.ToUniversalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
                        Role = user.Role,
                        ShortName = user.ShortName,
                        Color = user.Color,
                        AvatarPath = user.AvatarPath,
                        Status = user.Status,
                    },
                    isAdmin = false,
                },
                GroupId = Guid.Empty,
                TopicId = Guid.Empty,
                ConvId = conv.Id,
                Files = files,
            };
            return ServiceResponse<MessageDTO>.ForSuccess(messageDTO);
        } else
        {
            return ServiceResponse<MessageDTO>.FromError(CommonErrors.UserNotFound);
        }
    }

    public async Task<ServiceResponse<PagedResponse<MessageDTO>>> GetTopicMessages(PaginationSearchQueryParams pagination, MessagesGetDTO messagesGet, User? requestingUser = default, CancellationToken cancellationToken = default)
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
            return ServiceResponse<PagedResponse<MessageDTO>>.ForSuccess(result);
        }
    }

    public async Task<ServiceResponse<PagedResponse<MessageDTO>>> GetPrivateMessages(PaginationSearchQueryParams pagination, MessagesGetDTO messagesGet, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<PagedResponse<MessageDTO>>.FromError(CommonErrors.UserNotFound);
        }

        var conv = await _repository.GetAsync(new PrivateConversationSpec(messagesGet.ConvId), cancellationToken);

        if (conv == null)
        {
            return ServiceResponse<PagedResponse<MessageDTO>>.FromError(CommonErrors.ConvNotFound);
        }

        if (conv.User1Id != requestingUser.Id && conv.User2Id != requestingUser.Id)
        {
            return ServiceResponse<PagedResponse<MessageDTO>>.FromError(CommonErrors.ConvNotFound);
        }

        var message = await _repository.GetAsync(new MessageSpec(messagesGet.LastMessageId), cancellationToken);

        if (message == null)
        {
            var result = await _repository.PageAsync(pagination, new MessageProjectionSpec(messagesGet.ConvId), cancellationToken);
            return ServiceResponse<PagedResponse<MessageDTO>>.ForSuccess(result);
        }
        else
        {
            var result = await _repository.PageAsync(pagination, new MessageProjectionSpec(messagesGet.ConvId, message), cancellationToken);
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
