using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;

namespace MobyLabWebProgramming.Infrastructure.Services.Interfaces;
public interface IGroupService
{
    public Task<ServiceResponse> AddGroup(GroupAddDTO group, User? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse<PagedResponse<GroupDTO>>> GetGroups(PaginationQueryParams pagination, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<GroupDTO>>> GetPublicGroups(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);

    public Task<ServiceResponse<GroupLinkResponse>> GenerateLink(Guid groupId, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> JoinGroup(JoinGroupDTO joinGroup, User? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> ChangeRole(ChangeRoleDTO change, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> RemoveMember(RemoveMemberDTO remove, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> LeaveGroup(LeaveGroupDTO leaveGroup, User? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse> DeleteGroup(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<GroupGetDTO>> GetGroup(Guid groupId, User? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<GroupMemberDTO>>> GetGroupMembers(PaginationQueryParams pagination, Guid GroupId, User? requestingUser = default, CancellationToken cancellationToken = default);

    public Task<ServiceResponse<GroupMemberDTO>> GetGroupMember(Guid GroupId, Guid UserId, User? requestingUser = default, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<GroupDetailsDTO>> GetGroupDetails(Guid groupId, User? requestingUser = default, CancellationToken cancellationToken = default);
}
