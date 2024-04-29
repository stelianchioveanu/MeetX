using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Text.RegularExpressions;

namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class ValidationService : IValidationService
{

    public ValidationService()
    {
    }

    public bool VerifyEmail(string Email)
    {
        try
        {
            return Regex.IsMatch(Email,
                RegexEnum.EmailRegex,
                RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
        }
        catch (RegexMatchTimeoutException)
        {
            return false;
        }
    }

    public bool VerifyPassword(string Password)
    {
        try
        {
            return Regex.IsMatch(Password,
                RegexEnum.PasswordRegex,
                RegexOptions.None, TimeSpan.FromMilliseconds(1));
        }
        catch (RegexMatchTimeoutException)
        {
            return false;
        }
    }

}
