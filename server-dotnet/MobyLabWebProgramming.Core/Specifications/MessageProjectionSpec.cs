using System.Globalization;
using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class MessageProjectionSpec : BaseSpec<MessageProjectionSpec, Message, MessageDTO>
{
    /// <summary>
    /// This is the projection/mapping expression to be used by the base class to get UserDTO object from the database.
    /// </summary>
    protected override Expression<Func<Message, MessageDTO>> Spec => e => new()
    {
        Id = e.Id,
        Text = e.Text,
        CreatedDate = DateTime.Parse(e.CreatedAt.ToUniversalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
        User = new GroupMemberDTO
        {
            User = new UserDTO
            {
                Id = e.User.Id,
                Email = e.User.Email,
                Name = e.User.Name,
                Role = e.User.Role,
                RegisteredDate = DateTime.Parse(e.User.CreatedAt.ToUniversalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
                ShortName = e.User.ShortName,
                Status = e.User.Status,
                Color = e.User.Color,
                AvatarPath = e.User.AvatarPath,
            },
            isAdmin = e.Topic != null && e.Topic.Group.Admins.Any(x => x.Id == e.User.Id),
            isMember = e.Topic != null && e.Topic.Group.Users.Any(x => x.Id == e.User.Id)
        },
        GroupId = e.Topic != null ? e.Topic.GroupId : Guid.Empty,
        TopicId = e.Topic != null ? e.Topic.Id : Guid.Empty,
        ConvId = e.Conversation != null ? e.Conversation.Id : Guid.Empty,
        Files = e.Files != null ? e.Files.Select(o => new FileGetDTO {Name = o.Name, Path = o.Path, Type = o.Type}).ToList() : new List<FileGetDTO>()
    };

    public MessageProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public MessageProjectionSpec(Guid id, Message message)
    {
        Query.Where(e => (e.TopicId == id || e.ConversationId == id) && e.CreatedAt < message.CreatedAt).OrderByDescending(x => x.CreatedAt, true);
    }

    public MessageProjectionSpec(Guid id)
    {
        Query.Where(e => e.TopicId == id || e.ConversationId == id).OrderByDescending(x => x.CreatedAt, true);
    }
}
