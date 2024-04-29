namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class TopicDTO
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime CreatedDate { get; set; }
    public UserDTO User { get; set; } = default!;
}
