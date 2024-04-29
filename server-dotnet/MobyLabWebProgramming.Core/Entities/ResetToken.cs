namespace MobyLabWebProgramming.Core.Entities;

public class ResetToken : BaseEntity
{
    public string Token { get; set; } = default!;
    public User User { get; set; } = default!;
    public Guid UserId { get; set; }
}
