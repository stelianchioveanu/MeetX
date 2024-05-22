using System.Globalization;
using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class PrivateConversationProjectionSpec : BaseSpec<PrivateConversationProjectionSpec, PrivateConversation, PrivateConversationDTO>
{
    protected override Expression<Func<PrivateConversation, PrivateConversationDTO>> Spec => e => new()
    {
        Id = e.Id,
        User1 = new UserDTO
        {
            Id = e.User1.Id,
            Email = e.User1.Email,
            Name = e.User1.Name,
            Role = e.User1.Role,
            RegisteredDate = DateTime.Parse(e.User1.CreatedAt.ToUniversalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
        },
        User2 = new UserDTO
        {
            Id = e.User2.Id,
            Email = e.User2.Email,
            Name = e.User2.Name,
            Role = e.User2.Role,
            RegisteredDate = DateTime.Parse(e.User2.CreatedAt.ToUniversalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
        },
    };

    public PrivateConversationProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public PrivateConversationProjectionSpec(Guid Id)
    {
        Query.Where(e => e.Id == Id).OrderByDescending(x => x.CreatedAt, true);
    }

    public PrivateConversationProjectionSpec(string? search, Guid userId)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            Query.Where(e => e.User1Id == userId || e.User2Id == userId).OrderByDescending(x => x.CreatedAt, true).Include(e => e.Messages);
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => e.User1Id == userId || e.User2Id == userId).OrderByDescending(x => x.CreatedAt, true).Include(e => e.Messages);
    }
}
