using Microsoft.AspNetCore.Http;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class FilesAddDTO
{
    public ICollection<IFormFile>? Images { get; set; } = default!;
    public ICollection<IFormFile>? Files { get; set; } = default!;
    public Guid TopicId { get; set; }
    public Guid PrivateConversationId { get; set; }
}
