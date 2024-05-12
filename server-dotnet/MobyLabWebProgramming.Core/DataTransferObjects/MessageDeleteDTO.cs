namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class MessageDeleteDTO
{
    public Guid Id { get; set; }
    public Guid GroupId { get; set; }
    public Guid TopicId { get; set; }
}
