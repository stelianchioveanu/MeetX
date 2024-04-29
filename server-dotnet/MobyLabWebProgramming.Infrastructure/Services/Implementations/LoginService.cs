using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MobyLabWebProgramming.Infrastructure.Configurations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Security.Cryptography;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class LoginService : ILoginService
{
    private readonly JwtConfiguration _jwtConfiguration;
    private readonly RefreshJwtConfiguration _refreshJwtConfiguration;

    public LoginService(IOptions<JwtConfiguration> jwtConfiguration, IOptions<RefreshJwtConfiguration> refreshJwtConfiguration)
    {
        _jwtConfiguration = jwtConfiguration.Value;
        _refreshJwtConfiguration = refreshJwtConfiguration.Value;
    }

    public string GetToken(UserDTO user, DateTime issuedAt, TimeSpan expiresIn, TokenTypeEnum type)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtConfiguration.Key);
        if (type == TokenTypeEnum.Refresh)
        {
            key = Encoding.ASCII.GetBytes(_refreshJwtConfiguration.Key);
        }
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new(new[] { new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) }), // Set the user ID as the "nameid" claim in the JWT.
            Claims = new Dictionary<string, object> // Add any other claims in the JWT, you can even add custom claims if you want.
            {
                { ClaimTypes.Name, user.Name },
                { ClaimTypes.Email, user.Email },
                { ClaimTypes.Role, user.Role.Value }
            },
            IssuedAt = issuedAt, // This sets the "iat" claim to indicate then the JWT was emitted.
            Expires = issuedAt.Add(expiresIn), // This sets the "exp" claim to indicate when the JWT expires and cannot be used.
            Issuer = _jwtConfiguration.Issuer, // This sets the "iss" claim to indicate the authority that issued the JWT.
            Audience = _jwtConfiguration.Audience, // This sets the "aud" claim to indicate to which client the JWT is intended to.
            SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature) // Sign the JWT, it will set the algorithm in the JWT header to "HS256" for HMAC with SHA256.
        };

        return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor)); // Create the token.
    }

    public string GetRandomToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

}
