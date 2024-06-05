namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class GroupDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public int NumberMembers { get; set; } = default!;
    public string ShortName { get; set; } = default!;
    public string Color { get; set; } = default!;
    public bool isPublic { get; set; } = false;
}
