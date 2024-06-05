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

    public UserSpec(string staff, Guid groupId)
    {
        Query.Where(e => (e.Role == Enums.UserRoleEnum.Admin || e.Role == Enums.UserRoleEnum.Staff) && e.Groups.All(x => x.Id != groupId)).Include(e => e.Groups);
    }
}