using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class FileSpec : BaseSpec<FileSpec, FileEntity>
{
    public FileSpec(Guid id) : base(id)
    {
    }
}