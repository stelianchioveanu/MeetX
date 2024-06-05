using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class PublicGroupProjectionSpec : BaseSpec<PublicGroupProjectionSpec, Group, GroupDTO>
{
    /// <summary>
    /// This is the projection/mapping expression to be used by the base class to get UserDTO object from the database.
    /// </summary>
    protected override Expression<Func<Group, GroupDTO>> Spec => e => new()
    {
        Id = e.Id,
        Name = e.Name,
        isPublic = e.isPublic
    };

    public PublicGroupProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public PublicGroupProjectionSpec(string? search)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null || search == "")
        {
            Query.Where(e => e.isPublic == false && e.ChildrenGroups.Count != 0).OrderBy(x => x.Name, true);
            return;
        }
        else
        {
            var searchExpr1 = $"% {search}%";
            var searchExpr2 = $"{search}%";

            Query.Where(e => e.isPublic == true && e.ChildrenGroups.Count == 0 && (EF.Functions.ILike(e.Name, searchExpr2) || EF.Functions.ILike(e.Name, searchExpr1))).OrderBy(x => x.Name, true);

        }
    }
}
