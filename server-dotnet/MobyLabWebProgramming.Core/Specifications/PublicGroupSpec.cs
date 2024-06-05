using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class PublicGroupSpec : BaseSpec<PublicGroupSpec, Group>
{
    public PublicGroupSpec(string groupName, bool isPublic)
    {
        Query.Where(e => e.Name == groupName && e.isPublic == isPublic);
    }
}