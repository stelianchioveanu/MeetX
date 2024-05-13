namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class MessageDTO
{
    public Guid Id { get; set; }
    public string Text { get; set; } = default!;
    public string CreatedDate { get; set; } = default!;
    public Guid GroupId { get; set; }
    public Guid TopicId { get; set; }
    public UserDTO User { get; set; } = default!;
}
