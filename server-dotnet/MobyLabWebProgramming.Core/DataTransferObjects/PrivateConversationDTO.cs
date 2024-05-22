namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class PrivateConversationDTO
{
    public Guid Id { get; set; }
    public UserDTO User1 { get; set; } = default!;

    public UserDTO User2 { get; set; } = default!;
}
