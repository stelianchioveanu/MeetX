namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class GroupDetailsDTO
{
    public GroupDTO Group { get; set; } = default!;
    public bool IsMember { get; set; } = default!;
}
