using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Text;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Configurations;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using Serilog;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class UserService : IUserService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly ILoginService _loginService;
    private readonly IMailService _mailService;
    private readonly IValidationService _validationService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly RefreshJwtConfiguration _jwtConfiguration;
    private readonly IFileService _fileService;

    public UserService(IRepository<WebAppDatabaseContext> repository, ILoginService loginService, IMailService mailService, IValidationService validationService, IHttpContextAccessor httpContextAccessor, IOptions<RefreshJwtConfiguration> jwtConfiguration, IFileService fileService)
    {
        _repository = repository;
        _loginService = loginService;
        _mailService = mailService;
        _validationService = validationService;
        _httpContextAccessor = httpContextAccessor;
        _jwtConfiguration = jwtConfiguration.Value;
        _fileService = fileService;
    }

    public async Task<ServiceResponse<UserDTO>> GetUser(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new UserProjectionSpec(id), cancellationToken);

        return result != null ? 
            ServiceResponse<UserDTO>.ForSuccess(result) : 
            ServiceResponse<UserDTO>.FromError(CommonErrors.UserNotFound);
    }

    public async Task<ServiceResponse<User>> GetUserNotDTO(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new UserSpec(id), cancellationToken);

        return result != null ?
            ServiceResponse<User>.ForSuccess(result) :
            ServiceResponse<User>.FromError(CommonErrors.UserNotFound);
    }

    public async Task<ServiceResponse<PagedResponse<UserDTO>>> GetUsers(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await _repository.PageAsync(pagination, new UserProjectionSpec(pagination.Search), cancellationToken);

        return ServiceResponse<PagedResponse<UserDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<LoginResponseDTO>> Login(LoginDTO login, CancellationToken cancellationToken = default)
    {
        var result = await _repository.GetAsync(new UserSpec(login.Email), cancellationToken);

        if (result == null)
        {
            return ServiceResponse<LoginResponseDTO>.FromError(CommonErrors.BadCredentials);
        }

        if (result.Password != login.Password)
        {
            return ServiceResponse<LoginResponseDTO>.FromError(CommonErrors.BadCredentials);
        }

        var user = new UserDTO
        {
            Id = result.Id,
            Email = result.Email,
            Name = result.Name,
            Role = result.Role,
            RegisteredDate = DateTime.Parse(result.CreatedAt.ToUniversalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
            ShortName = result.ShortName,
            Color = result.Color,
            AvatarPath = result.AvatarPath,
            Status = result.Status,
        };

        var entity = await _repository.GetAsync(new RefreshTokenSpec(user.Id), cancellationToken);

        if (entity != null)
        {
            entity.Token = _loginService.GetToken(user, DateTime.UtcNow, new(7, 0, 0, 0), TokenTypeEnum.Refresh);
            await _repository.UpdateAsync(entity, cancellationToken);
        } else
        {
            entity = await _repository.AddAsync(new RefreshToken
            {
                Token = _loginService.GetToken(user, DateTime.UtcNow, new(7, 0, 0, 0), TokenTypeEnum.Refresh),
                UserId = user.Id,
            }, cancellationToken);
        }

        if (_httpContextAccessor.HttpContext != null)
        {
            _httpContextAccessor.HttpContext.Response.Cookies.Append("MeetxRefresh", entity.Token,
            new CookieOptions
            {
                Expires = DateTime.UtcNow.AddDays(7),
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.Lax
            });
        } else
        {
            Console.WriteLine("nu e ok");
        }

        return ServiceResponse<LoginResponseDTO>.ForSuccess(new()
        {
            User = user,
            Token = _loginService.GetToken(user, DateTime.UtcNow, new(0, 0, 1, 0), TokenTypeEnum.Auth)
        });
    }

    public async Task<ServiceResponse<int>> GetUserCount(CancellationToken cancellationToken = default) => 
        ServiceResponse<int>.ForSuccess(await _repository.GetCountAsync<User>(cancellationToken)); // Get the count of all user entities in the database.

    public async Task<ServiceResponse> AddUser(UserAddDTO user, UserDTO? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add users!", ErrorCodes.CannotAdd));
        }

        var result = await _repository.GetAsync(new UserSpec(user.Email), cancellationToken);

        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "The user already exists!", ErrorCodes.UserAlreadyExists));
        }

        await _repository.AddAsync(new User
        {
            Email = user.Email,
            Name = user.Name,
            Role = user.Role,
            Password = user.Password,
            ShortName = user.ShortName,
            Color = user.Color
        }, cancellationToken);

        //await _mailService.SendMail(user.Email, "Welcome!", MailTemplates.UserAddTemplate(user.Name), true, "My App", cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateUser(UserUpdateDTO user, User? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        if (user == null)
        {
            return ServiceResponse.FromError(CommonErrors.BadRequets);
        }

        if (user.Name != null)
        {
            var name = user.Name.Trim();

            if (name.Length < 2)
            {
                return ServiceResponse.FromError(CommonErrors.BadName);
            }
            requestingUser.Name = name;
            requestingUser.ShortName = name.Split(' ').Length > 1 ? $"{name.Split(' ')[0][0]}{name.Split(' ')[1][0]}" : name.Substring(0, 2);
        }

        if (user.Password != null && user.Password != "")
        {
            if (_validationService.VerifyPassword(user.Password))
            {
                return ServiceResponse.FromError(CommonErrors.BadPassword);
            }
            requestingUser.Password = PasswordUtils.HashPassword(user.Password);
        }

        if (user.Avatar != null)
        {
            Console.WriteLine("ok");
            var path = _fileService.SaveAvatar(user.Avatar, requestingUser.Id);
            if (path != null)
            {
                if (path.Result != null)
                {
                    requestingUser.AvatarPath = path.Result;
                } else if (path.Error != null)
                {
                    return ServiceResponse.FromError(path.Error);
                }
            } else
            {
                return ServiceResponse.FromError(CommonErrors.FileAddError);
            }
        }

        if (user.AvatarRemoved)
        {
            requestingUser.AvatarPath = "";
        }

        await _repository.UpdateAsync(requestingUser, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> Register(RegisterDTO register, CancellationToken cancellationToken = default)
    {
        if (register == null || register.Email.IsNullOrEmpty() || register.Name.IsNullOrEmpty() || register.Password.IsNullOrEmpty())
        {
            return ServiceResponse.FromError(new(HttpStatusCode.BadRequest, "Every input should have at least 1 character!", ErrorCodes.WrongInputs));
        }

        var name = register.Name.Trim();

        if (name.Length < 2)
        {
            return ServiceResponse.FromError(CommonErrors.BadName);
        }

        if (!_validationService.VerifyEmail(register.Email))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.BadRequest, "Email is not valid!", ErrorCodes.WrongEmail));
        }

        if (_validationService.VerifyPassword(register.Password))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.BadRequest, "Password is not valid!", ErrorCodes.WrongPassword));
        }

        var result = await _repository.GetAsync(new UserSpec(register.Email), cancellationToken);

        if (result != null)
        {
            return ServiceResponse.FromError(CommonErrors.UserAlreadyExists);
        }

        List<string> colors = new List<string> { "#e03f4f", "#c16ca8", "#a86cc1", "#6ca8c1", "#98fb98", "#3fe0d0", "#26abff" };
        Random random = new Random();
        int randomIndex = random.Next(0, colors.Count);

        await _repository.AddAsync(new User
        {
            Email = register.Email,
            Name = register.Name,
            Role = UserRoleEnum.Client,
            Password = PasswordUtils.HashPassword(register.Password),
            ShortName = name.Split(' ').Length > 1 ? $"{name.Split(' ')[0][0]}{name.Split(' ')[1][0]}" : name.Substring(0, 2),
            Color = colors[randomIndex]
        }, cancellationToken);

        //await _mailService.SendMail(requestReset.Email, "Welcome!", MailTemplates.RequestResetTemplate(resetToken + " " + "id"), true, "MeetX", cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> RequestReset(RequestResetDTO requestReset, CancellationToken cancellationToken = default)
    {
        if (!_validationService.VerifyEmail(requestReset.Email))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.BadRequest, "Email is not valid!", ErrorCodes.WrongInputs));
        }

        var entity = await _repository.GetAsync(new UserSpec(requestReset.Email), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse.ForSuccess();
        }

        var token = await _repository.GetAsync(new ResetTokenSpec(entity.Id, SpecEnum.ByUserId), cancellationToken);

        var resetToken = _loginService.GetRandomToken();

        if (token == null)
        {
            token = await _repository.AddAsync(new ResetToken
            {
                Token = resetToken,
                UserId = entity.Id,
            }, cancellationToken);
        } else
        {
            token.Token = resetToken ?? token.Token;

            await _repository.UpdateAsync(token, cancellationToken);
        }
        var email = $"http://localhost:5173/resetPassword?token={HttpUtility.UrlEncode(token.Token)}&id={token.Id}";
        Console.WriteLine(email);
        //await _mailService.SendMail(requestReset.Email, "Welcome!", MailTemplates.RequestResetTemplate(resetToken + " " + "id"), true, "MeetX", cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> ResetPassword(ResetPasswordDTO reset, CancellationToken cancellationToken = default)
    {
        Console.WriteLine(reset.Token);
        var token = await _repository.GetAsync(new ResetTokenSpec(reset.Id, SpecEnum.ByTokenId), cancellationToken);

        if (token == null || token.Token != reset.Token)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Unauthorized, "Token expired!", ErrorCodes.TokenExpired));
        }

        var user = await _repository.GetAsync(new UserSpec(token.UserId), cancellationToken);

        if (user == null)
        {
            await _repository.DeleteAsync(new ResetTokenSpec(reset.Id, SpecEnum.ByTokenId), cancellationToken);
            return ServiceResponse.FromError(new(HttpStatusCode.Unauthorized, "Token expired!", ErrorCodes.TokenExpired));
        }

        if (token.UpdatedAt.AddMinutes(30) < DateTime.UtcNow)
        {
            await _repository.DeleteAsync(new ResetTokenSpec(reset.Id, SpecEnum.ByTokenId), cancellationToken);
            return ServiceResponse.FromError(new(HttpStatusCode.Unauthorized, "Token expired!", ErrorCodes.TokenExpired));
        } 

        if (_validationService.VerifyPassword(reset.Password))
        {
            return ServiceResponse.FromError(new(HttpStatusCode.BadRequest, "Password is not valid!", ErrorCodes.WrongInputs));
        }

        await _repository.DeleteAsync(new ResetTokenSpec(reset.Id, SpecEnum.ByTokenId), cancellationToken);
        user.Password = PasswordUtils.HashPassword(reset.Password) ?? user.Password;
        await _repository.UpdateAsync(user, cancellationToken);

        //await _mailService.SendMail(requestReset.Email, "Welcome!", MailTemplates.RequestResetTemplate(resetToken), true, "MeetX", cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<RefreshResponseDTO>> RefreshToken(CancellationToken cancellationToken = default)
    {

        if (_httpContextAccessor.HttpContext != null)
        {
            var token = _httpContextAccessor.HttpContext.Request.Cookies["MeetxRefresh"];
           
            if (token != null)
            {
                var entity = await _repository.GetAsync(new RefreshTokenSpec(token), cancellationToken);

                if (entity != null)
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(_jwtConfiguration.Key);
                    try
                    {
                        tokenHandler.ValidateToken(token, new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = new SymmetricSecurityKey(key),
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidAudience = _jwtConfiguration.Audience,
                            ValidIssuer = _jwtConfiguration.Issuer,
                            ClockSkew = TimeSpan.Zero
                        }, out SecurityToken validatedToken);

                        var jwtToken = (JwtSecurityToken)validatedToken;
                        var userId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "nameid").Value);

                        var user = await _repository.GetAsync(new UserSpec(userId), cancellationToken);

                        if (user != null)
                        {
                            var userDTO = new UserDTO
                            {
                                Id = user.Id,
                                Email = user.Email,
                                Name = user.Name,
                                Role = user.Role,
                                RegisteredDate = DateTime.Parse(user.CreatedAt.ToUniversalTime().ToString(), null, DateTimeStyles.RoundtripKind).ToString(),
                                ShortName = user.ShortName,
                                Color = user.Color,
                                Status = user.Status,
                                AvatarPath = user.AvatarPath,
                            };

                            entity.Token = _loginService.GetToken(userDTO, DateTime.UtcNow, new(7, 0, 0, 0), TokenTypeEnum.Refresh);
                            await _repository.UpdateAsync(entity, cancellationToken);

                            if (_httpContextAccessor.HttpContext != null)
                            {
                                _httpContextAccessor.HttpContext.Response.Cookies.Append("MeetxRefresh", entity.Token,
                                new CookieOptions
                                {
                                    Expires = DateTime.UtcNow.AddDays(7),
                                    HttpOnly = true,
                                    Secure = true,
                                    IsEssential = true,
                                    SameSite = SameSiteMode.None
                                });
                            }

                            return ServiceResponse<RefreshResponseDTO>.ForSuccess(new()
                            {
                                Token = _loginService.GetToken(userDTO, DateTime.UtcNow, new(0, 0, 1, 0), TokenTypeEnum.Auth)
                            });
                        }
                    }
                    catch
                    {
                        return ServiceResponse<RefreshResponseDTO>.FromError(new(HttpStatusCode.Unauthorized, "Refresh token expired!", ErrorCodes.TokenExpired));
                    }
                }
            }
        }
        return ServiceResponse<RefreshResponseDTO>.FromError(new(HttpStatusCode.Unauthorized, "Refresh token expired!", ErrorCodes.TokenExpired));
    }
}
