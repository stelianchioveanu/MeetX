using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;
using System.Xml.Linq;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class GroupSpec : BaseSpec<GroupSpec, Group>
{
    public GroupSpec(Guid GroupId)
    {
        Query.Where(e => e.Id == GroupId).Include(e => e.Admins).Include(e => e.Users).Include(e => e.ParentGroup).Include(e => e.ChildrenGroups);
    }

    public GroupSpec(string Name, Guid UserId)
    {
        Query.Where(e => e.Name == Name && e.FirstAdminId == UserId);
    }

    public GroupSpec(bool isPublic)
    {
        Query.Where(e => e.isPublic == isPublic).Include(e => e.Admins);
    }
}