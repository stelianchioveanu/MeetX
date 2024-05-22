namespace MobyLabWebProgramming.Core.DataTransferObjects;

public class FilesAddedDTO
{
    public ICollection<Guid> Files { get; set; } = default!;
}
