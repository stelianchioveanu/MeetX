﻿using MobyLabWebProgramming.Core.Enums;
using System.Reflection.Metadata;

namespace MobyLabWebProgramming.Core.Entities;

/// <summary>
/// This is an example for a user entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class User : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
    public UserRoleEnum Role { get; set; } = default!;
    public ICollection<UserFile> UserFiles { get; set; } = default!;
    public RefreshToken? RefreshToken { get; set; }
}
