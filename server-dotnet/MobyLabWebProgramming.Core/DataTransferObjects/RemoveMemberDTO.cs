using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class RemoveMemberDTO
{
    public Guid UserId { get; set; }
    public Guid GroupId { get; set; }
}
