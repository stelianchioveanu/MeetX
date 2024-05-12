namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class MessageAddDTO
{
    public Guid GroupId { get; set; } = default!;
    public Guid TopicId { get; set; } = default!;
    public Guid ToUser { get; set; } = default!;
    public string Text { get; set; } = default!;
}
