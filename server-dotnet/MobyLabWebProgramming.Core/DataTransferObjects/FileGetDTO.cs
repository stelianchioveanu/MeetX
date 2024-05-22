using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class FileGetDTO
{
    public string Name { get; set; } = default!;
    public string Path { get; set; } = default!;
    public FileTypes Type { get; set; } = default!;
}
