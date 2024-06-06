namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class ContactFormDTO
{
    public Guid Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Message { get; set; } = default!;
    public string Date { get; set; } = default!;
    public bool IsChecked { get; set; } = default!;
}
