using MobyLabWebProgramming.Core.DataTransferObjects;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;


public interface IValidationService
{

    public bool VerifyEmail(string Email);

    public bool VerifyPassword(string Password);
}
