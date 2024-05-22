

using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

public class FileEntity : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Path { get; set; } = default!;
    public FileTypes Type { get; set; } = default!;
    public Message? Message { get; set; } = default!;
    public Guid? MessageId { get; set; } = default!;
}
