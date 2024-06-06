namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class ContactFormAddDTO
{
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Message { get; set; } = default!;
}
