namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class GroupDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public int NumberMembers { get; set; } = default!;
}
