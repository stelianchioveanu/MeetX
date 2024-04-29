using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class ResetTokenSpec : BaseSpec<ResetTokenSpec, ResetToken>
{
    public ResetTokenSpec(Guid id, SpecEnum byId)
    {
        if (byId == SpecEnum.ByTokenId)
        {
            Query.Where(e => e.Id == id);
        } else
        {
            Query.Where(e => e.UserId == id);
        }
    }
}