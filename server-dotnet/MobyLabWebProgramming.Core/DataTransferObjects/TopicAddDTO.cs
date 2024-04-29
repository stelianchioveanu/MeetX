namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class TopicAddDTO
{
    public Guid GroupId { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public int NumberMembers { get; set; } = default!;
}
