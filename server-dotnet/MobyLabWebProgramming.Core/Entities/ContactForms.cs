

namespace MobyLabWebProgramming.Core.Entities;

public class ContactForms : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Message { get; set; } = default!;
    public bool isChecked { get; set; } = false;
}
