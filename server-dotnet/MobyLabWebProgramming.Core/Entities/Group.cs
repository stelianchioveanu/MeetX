namespace MobyLabWebProgramming.Core.Entities;

public class Group : BaseEntity
{
    public string Name { get; set; } = default!;
    public String ShortName { get; set; } = default!;
    public String Color { get; set; } = default!;
    public User FirstAdmin { get; set; } = default!;
    public Guid FirstAdminId { get; set; } = default!;
    public ICollection<User> Admins { get; set; } = default!;
    public ICollection<User> Users { get; set; } = default!;
    public ICollection<Topic> Topics { get; set; } = default!;
    public LinkGroup LinkGroup { get; set; } = default!;
}
