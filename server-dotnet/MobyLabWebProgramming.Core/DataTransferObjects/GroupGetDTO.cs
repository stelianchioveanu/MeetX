using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class GroupGetDTO
{
    public GroupDTO Group { get; set; }
    public GroupRoleEnum GroupRole { get; set; } = default!;
}
