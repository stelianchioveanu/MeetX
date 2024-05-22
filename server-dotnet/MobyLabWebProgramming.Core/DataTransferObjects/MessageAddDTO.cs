using Microsoft.AspNetCore.Http;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class MessageAddDTO
{
    public Guid GroupId { get; set; } = default!;
    public Guid TopicId { get; set; } = default!;
    public Guid UserId { get; set; } = default!;
    public string Text { get; set; } = default!;
    public ICollection<Guid>? Files { get; set; }
}
