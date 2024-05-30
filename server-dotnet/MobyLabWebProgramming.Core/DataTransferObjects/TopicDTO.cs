namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class TopicDTO
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string CreatedDate { get; set; } = default!;
    public GroupMemberDTO User { get; set; } = default!;
    public int NumberAnswers { get; set; } = default!;
}
