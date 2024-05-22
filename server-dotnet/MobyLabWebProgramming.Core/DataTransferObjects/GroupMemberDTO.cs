using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class GroupMemberDTO
{
    public UserDTO User { get; set; } = default!;
    public bool isAdmin { get; set; } = default!;
}
