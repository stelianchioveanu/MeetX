namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class MessagesGetDTO
{
    public Guid GroupId { get; set; }
    public Guid TopicId { get; set; }
    public Guid ConvId { get; set; }
    public Guid LastMessageId { get; set; }
}
