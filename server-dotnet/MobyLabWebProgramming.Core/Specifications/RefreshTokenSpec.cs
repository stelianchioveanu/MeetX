using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class RefreshTokenSpec : BaseSpec<RefreshTokenSpec, RefreshToken>
{
    public RefreshTokenSpec(Guid UserId)
    {
        Query.Where(e => e.UserId == UserId);
    }

    public RefreshTokenSpec(string Token)
    {
        Query.Where(e => e.Token == Token);
    }
}