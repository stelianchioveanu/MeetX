﻿namespace MobyLabWebProgramming.Core.DataTransferObjects;

/// <summary>
/// This DTO is used to respond to a login with the JWT token and user information.
/// </summary>
public class RefreshResponseDTO
{
    public string Token { get; set; } = default!;
}
