using MobyLabWebProgramming.Core.Entities;
using Ardalis.Specification;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class PrivateConversationSpec : BaseSpec<PrivateConversationSpec, PrivateConversation>
{
    public PrivateConversationSpec(Guid id) : base(id)
    {
    }
    public PrivateConversationSpec(Guid? userId1, Guid? userId2)
    {
        if (userId1 != null && userId2 != null && userId1 != Guid.Empty && userId2 != Guid.Empty)
        {
            Query.Where(e => (e.User1Id == userId1 && e.User2Id == userId2) || (e.User1Id == userId2 && e.User2Id == userId1));
        }
    }
}