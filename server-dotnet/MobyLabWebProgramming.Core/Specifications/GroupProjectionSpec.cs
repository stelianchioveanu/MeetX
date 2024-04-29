using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class GroupProjectionSpec : BaseSpec<GroupProjectionSpec, Group, GroupDTO>
{
    /// <summary>
    /// This is the projection/mapping expression to be used by the base class to get UserDTO object from the database.
    /// </summary>
    protected override Expression<Func<Group, GroupDTO>> Spec => e => new()
    {
        Id = e.Id,
        Name = e.Name,
        NumberMembers = e.Users.Count,
    };

    public GroupProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public GroupProjectionSpec(Guid Id, SpecEnum spec)
    {
        if (spec == SpecEnum.ByGroupId)
        {
            Query.Where(e => e.Id == Id).Include(e => e.Users);
        } else
        {
            Query.Where(e => e.Users.Any(u => u.Id == Id));
        }
            
    }
}
