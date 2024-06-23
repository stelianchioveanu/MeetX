using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to transfer information about a user within the application and to client application.
/// Note that it doesn't contain a password property and that is why you should use DTO rather than entities to use only the data that you need or protect sensible information.
/// </summary>
public class UserDTO
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string RegisteredDate { get; set; } = default!;
    public UserRoleEnum Role { get; set; } = default!;
    public string ShortName { get; set; } = default!;
    public string Color { get; set; } = default!;
    public string AvatarPath { get; set; } = default!;
    public bool Status { get; set; } = default!;
    public string Position { get; set; } = default!;
}
