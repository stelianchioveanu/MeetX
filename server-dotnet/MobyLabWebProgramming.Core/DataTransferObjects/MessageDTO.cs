using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class MessageDTO
{
    public Guid Id { get; set; }
    public string Text { get; set; } = default!;
    public string CreatedDate { get; set; } = default!;
    public Guid GroupId { get; set; }
    public Guid TopicId { get; set; }
    public Guid ConvId { get; set; }
    public GroupMemberDTO User { get; set; } = default!;
    public ICollection<FileGetDTO>? Files { get; set; }
}
