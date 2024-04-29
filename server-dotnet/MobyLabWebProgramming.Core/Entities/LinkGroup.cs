namespace MobyLabWebProgramming.Core.Entities;

public class LinkGroup : BaseEntity
{
    public string Token { get; set; } = default!;
    public Group Group { get; set; } = default!;
    public Guid GroupId { get; set; }
}
