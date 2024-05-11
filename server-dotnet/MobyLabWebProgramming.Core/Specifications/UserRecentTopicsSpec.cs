using Ardalis.Specification;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class UserRecentTopicsSpec : BaseSpec<UserRecentTopicsSpec, UserRecentTopics>
{
    public UserRecentTopicsSpec(Guid id) : base(id)
    {
    }

    public UserRecentTopicsSpec(Guid UserId, Guid TopicId)
    {
        Query.Where(e => e.UserId == UserId && e.TopicId == TopicId);
    }
}