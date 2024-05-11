

namespace MobyLabWebProgramming.Core.Entities;

public class Topic : BaseEntity
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public Group Group { get; set; } = default!;
    public Guid GroupId { get; set; } = default!;
    public User User { get; set; } = default!;
    public Guid UserId { get; set; } = default!;
    public ICollection<UserRecentTopics> RecentTopicUsers { get; set; } = default!;
}
