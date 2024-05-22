namespace MobyLabWebProgramming.Core.Entities;

public class PrivateConversation : BaseEntity
{
    public User User1 { get; set; } = default!;
    public Guid User1Id { get; set; } = default!;
    public User User2 { get; set; } = default!;
    public Guid User2Id { get; set; } = default!;
    public ICollection<Message>? Messages { get; set; }
}
