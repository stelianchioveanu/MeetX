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
        User = new UserDTO
        {
            Id = e.User.Id,
            Email = e.User.Email,
            Name = e.User.Name,
            Role = e.User.Role
        },
    };

    public MessageProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public MessageProjectionSpec(Guid topicId)
    {
        Query.Where(e => e.TopicId == topicId).OrderByDescending(x => x.CreatedAt, true);
    }
}
