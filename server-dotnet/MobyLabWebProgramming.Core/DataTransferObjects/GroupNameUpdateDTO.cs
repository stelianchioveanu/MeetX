using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class GroupNameUpdateDTO
{
    public Guid GroupId { get; set; } = default!;
    public string Name { get; set; } = default!;
}
