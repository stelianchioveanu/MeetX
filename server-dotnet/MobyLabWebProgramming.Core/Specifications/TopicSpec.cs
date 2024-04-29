using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class TopicSpec : BaseSpec<TopicSpec, Topic>
{
    public TopicSpec(Guid id) : base(id)
    {
    }
}