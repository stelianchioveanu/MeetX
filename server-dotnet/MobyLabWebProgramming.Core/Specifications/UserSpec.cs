using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

/// <summary>
/// This is a simple specification to filter the user entities from the database via the constructors.
/// Note that this is a sealed class, meaning it cannot be further derived.
/// </summary>
public sealed class UserSpec : BaseSpec<UserSpec, User>
{
    public UserSpec(Guid id) : base(id)
    {
        Query.Where(e => e.Id == id).Include(e => e.StartedConversations).Include(e => e.ReceivedConversations);
    }

    public UserSpec(string email)
    {
        Query.Where(e => e.Email == email);
    }
}