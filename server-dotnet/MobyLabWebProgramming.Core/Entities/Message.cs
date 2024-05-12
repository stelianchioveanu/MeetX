

namespace MobyLabWebProgramming.Core.Entities;

public class Message : BaseEntity
{
    public string Text { get; set; } = default!;
    public Topic Topic { get; set; } = default!;
    public Guid TopicId { get; set; } = default!;
    public User User { get; set; } = default!;
    public Guid UserId { get; set; } = default!;
}
