

namespace MobyLabWebProgramming.Core.Entities;

public class UserRecentTopics : BaseEntity
{
    public Topic Topic { get; set; } = default!;
    public Guid TopicId { get; set; } = default!;
    public User User { get; set; } = default!;
    public Guid UserId { get; set; } = default!;
}
