using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class MessageSpec : BaseSpec<MessageSpec, Message>
{
    public MessageSpec(Guid id) : base(id)
    {
    }
}