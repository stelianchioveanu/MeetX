using Microsoft.AspNetCore.Http;

namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to update a user, the properties besides the id are nullable to indicate that they may not be updated if they are null.
/// </summary>
public class UserUpdateDTO {
    public string Name { get; set; } = default!;
    public string? Password { get; set; } = default!;
    public IFormFile? Avatar { get; set; } = default!;
    public bool AvatarRemoved { get; set; } = false;
};
