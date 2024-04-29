using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class LinkGroupSpec : BaseSpec<LinkGroupSpec, LinkGroup>
{
    public LinkGroupSpec(Guid GroupId)
    {
        Query.Where(e => e.GroupId == GroupId);
    }
}