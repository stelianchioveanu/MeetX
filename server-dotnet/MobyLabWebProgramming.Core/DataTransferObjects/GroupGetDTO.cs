using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class GroupGetDTO
{
    public GroupDTO Group { get; set; } = default!;
    public GroupRoleEnum GroupRole { get; set; } = default!;
}
