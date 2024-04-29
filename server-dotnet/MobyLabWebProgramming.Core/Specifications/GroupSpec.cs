using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class GroupSpec : BaseSpec<GroupSpec, Group>
{
    public GroupSpec(Guid GroupId)
    {
        Query.Where(e => e.Id == GroupId).Include(e => e.Admins).Include(e => e.Users);
    }

    public GroupSpec(string Name, Guid UserId)
    {
        Query.Where(e => e.Name == Name && e.FirstAdminId == UserId);
    }
}