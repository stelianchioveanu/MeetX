using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;

/// <summary>
/// This service is used to emit a JWT token.
/// </summary>
public interface ILoginService
{
    public string GetToken(UserDTO user, DateTime issuedAt, TimeSpan expiresIn, TokenTypeEnum type);

    public string GetRandomToken();
}
