using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class ChangeRoleDTO
{
    public Guid UserId { get; set; }
    public Guid GroupId { get; set; }
    public GroupRoleEnum Role { get; set; } = default!;
}
