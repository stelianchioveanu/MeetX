namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class ContactFormUpdateDTO
{
    public Guid ContactId { get; set; }
    public bool Check { get; set; } = default!;
}
