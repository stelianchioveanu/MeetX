using System.Globalization;
using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;


public sealed class GroupMemberProjectionSpec : BaseSpec<GroupMemberProjectionSpec, User, GroupMemberDTO>
{
    protected override Expression<Func<User, GroupMemberDTO>> Spec => e => new()
    {
        User = new UserDTO
        {
            Id = e.Id,
            Email = e.Email,
            Name = e.Name,
            RegisteredDate = DateTime.Parse(e.CreatedAt.ToUniversalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
            Status = e.Status,
            ShortName = e.ShortName,
            AvatarPath = e.AvatarPath,
            Color = e.Color,
        }
    };

    public GroupMemberProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public GroupMemberProjectionSpec(Guid groupId)
    {
        Query.Where(e => e.Groups.Any(u => u.Id == groupId)).OrderBy(x => x.Name, true);
    }

    public GroupMemberProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Name, searchExpr)).OrderBy(x => x.Name, true);
    }
}
