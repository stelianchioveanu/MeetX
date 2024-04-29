namespace MobyLabWebProgramming.Core.Entities;

public class RefreshToken : BaseEntity
{
    public string Token { get; set; } = default!;
    public User User { get; set; } = default!;
    public Guid UserId { get; set; }
}
