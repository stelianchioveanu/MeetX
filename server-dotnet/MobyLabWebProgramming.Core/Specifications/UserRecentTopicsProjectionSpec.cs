using System.Globalization;
using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

/// <summary>
/// This is a specification to filter the user entities and map it to and UserDTO object via the constructors.
/// Note how the constructors call the base class's constructors. Also, this is a sealed class, meaning it cannot be further derived.
/// </summary>
public sealed class UserRecentTopicsProjectionSpec : BaseSpec<UserRecentTopicsProjectionSpec, UserRecentTopics, TopicDTO>
{
    /// <summary>
    /// This is the projection/mapping expression to be used by the base class to get UserDTO object from the database.
    /// </summary>
    protected override Expression<Func<UserRecentTopics, TopicDTO>> Spec => e => new()
    {
        Id = e.TopicId,
        Title = e.Topic.Title,
        Description = e.Topic.Description,
        CreatedDate = DateTime.Parse(e.CreatedAt.ToUniversalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
        User = new UserDTO
        {
            Id = e.User.Id,
            Email = e.User.Email,
            Name = e.User.Name,
            Role = e.User.Role
        }
    };

    public UserRecentTopicsProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public UserRecentTopicsProjectionSpec(Guid id) : base(id)
    {
    }

    public UserRecentTopicsProjectionSpec(Guid groupId, Guid userId)
    {
        Query.Where(e => e.UserId == userId && e.Topic.GroupId == groupId).OrderByDescending(x => x.UpdatedAt, true);
        return;
    }
}
