namespace MobyLabWebProgramming.Core.DataTransferObjects;

public record ResetPasswordDTO(string Token, Guid Id, string Password);
