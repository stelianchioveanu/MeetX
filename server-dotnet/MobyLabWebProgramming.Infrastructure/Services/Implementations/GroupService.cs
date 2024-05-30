using Microsoft.IdentityModel.Tokens;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;
using MobyLabWebProgramming.Core.Errors;
using MobyLabWebProgramming.Core.Requests;
using MobyLabWebProgramming.Core.Responses;
using MobyLabWebProgramming.Core.Specifications;
using MobyLabWebProgramming.Infrastructure.Database;
using MobyLabWebProgramming.Infrastructure.Repositories.Interfaces;
using MobyLabWebProgramming.Infrastructure.Services.Interfaces;
using System.Diagnostics.Metrics;
using System.Net;
using System.Web;
namespace MobyLabWebProgramming.Infrastructure.Services.Implementations;

public class GroupService : IGroupService
{
    private readonly IRepository<WebAppDatabaseContext> _repository;
    private readonly ILoginService _loginService;

    public GroupService(IRepository<WebAppDatabaseContext> repository, ILoginService loginService)
    {
        _repository = repository;
        _loginService = loginService;
    }

    public async Task<ServiceResponse> AddGroup(GroupAddDTO group, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        if (group == null || group.Name.IsNullOrEmpty())
        {
            return ServiceResponse.FromError(CommonErrors.BadRequets);
        }

        group.Name = group.Name.Trim();

        if (group.Name.Length < 2)
        {
            return ServiceResponse.FromError(CommonErrors.BadName);
        }

        var result = await _repository.GetAsync(new GroupSpec(group.Name, requestingUser.Id), cancellationToken);

        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "A group made by you with the same name already exists!", ErrorCodes.GroupAlreadyExists));
        }

        List<string> colors = new List<string> { "#e03f4f", "#c16ca8", "#a86cc1", "#6ca8c1", "#98fb98", "#3fe0d0", "#26abff" };
        Random random = new Random();
        int randomIndex = random.Next(0, colors.Count);

        var newGroup = new Group
        {
            Name = group.Name,
            FirstAdminId = requestingUser.Id,
            Admins = new List<User>(),
            Users = new List<User>(),
            ShortName = group.Name.Split(' ').Length > 1 ? $"{group.Name.Split(' ')[0][0]}{group.Name.Split(' ')[1][0]}" : group.Name.Substring(0, 2),
            Color = colors[randomIndex]
        };

        newGroup.Admins.Add(requestingUser);
        newGroup.Users.Add(requestingUser);

        await _repository.AddAsync(newGroup, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
    public async Task<ServiceResponse<PagedResponse<GroupDTO>>> GetGroups(PaginationQueryParams pagination, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<PagedResponse<GroupDTO>>.FromError(CommonErrors.UserNotFound);
        }

        var result = await _repository.PageAsync(pagination, new GroupProjectionSpec(requestingUser.Id, SpecEnum.ByUserId), cancellationToken);

        return ServiceResponse<PagedResponse<GroupDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<GroupLinkResponse>> GenerateLink(Guid groupId, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<GroupLinkResponse>.FromError(CommonErrors.UserNotFound);
        }

        var entity = await _repository.GetAsync(new GroupSpec(groupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse<GroupLinkResponse>.FromError(CommonErrors.GroupNotFound);
        }

        if (entity.Admins.All(e => e.Id != requestingUser.Id))
        {
            return ServiceResponse<GroupLinkResponse>.FromError(CommonErrors.NotAnAdmin);
        }

        var result = await _repository.GetAsync(new LinkGroupSpec(groupId), cancellationToken);
        var token = _loginService.GetRandomToken();

        if (result == null)
        {
            await _repository.AddAsync(new LinkGroup
            {
                Token = token,
                GroupId = groupId,
            }, cancellationToken);
        }
        else
        {
            result.Token = token;

            await _repository.UpdateAsync(result, cancellationToken);
        }

        string link = $"http://localhost:5173/invite?groupId={groupId}&token={HttpUtility.UrlEncode(token)}";

        return ServiceResponse<GroupLinkResponse>.ForSuccess(new GroupLinkResponse { Link = link });
    }

    public async Task<ServiceResponse> JoinGroup(JoinGroupDTO joinGroup, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        var entity = await _repository.GetAsync(new LinkGroupSpec(joinGroup.GroupId), cancellationToken);

        if (entity == null || entity.Token != joinGroup.Token || entity.UpdatedAt.AddMinutes(5) < DateTime.UtcNow)
        {
            return ServiceResponse.FromError(CommonErrors.TokenExpired);
        }

        var group = await _repository.GetAsync(new GroupSpec(joinGroup.GroupId), cancellationToken);

        if (group == null)
        {
            return ServiceResponse.FromError(CommonErrors.GroupNotFound);
        }

        if (group.Users.Any(e => e.Id == requestingUser.Id))
        {
            return ServiceResponse.FromError(CommonErrors.UserAlreadyInGroup);
        }

        group.Users.Add(requestingUser);
        await _repository.UpdateAsync(group, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> LeaveGroup(LeaveGroupDTO leaveGroup, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        var group = await _repository.GetAsync(new GroupSpec(leaveGroup.GroupId), cancellationToken);

        if (group == null)
        {
            return ServiceResponse.FromError(CommonErrors.GroupNotFound);
        }

        group.Users.Remove(requestingUser);
        group.Admins.Remove(requestingUser);
        
        if (group.Admins.Count == 0)
        {
            if (group.Users.Count == 0)
            {
                await _repository.DeleteAsync(new GroupSpec(group.Id), cancellationToken);
                return ServiceResponse.ForSuccess();
            }

            var users = group.Users.ToArray();

            foreach ( var user in users )
            {
                var newAdmin = await _repository.GetAsync(new UserSpec(user.Id), cancellationToken);
                if (newAdmin != null)
                {
                    group.Admins.Add(newAdmin);
                    break;
                }
            }
        }

        await _repository.UpdateAsync(group, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> ChangeRole(ChangeRoleDTO change, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        var group = await _repository.GetAsync(new GroupSpec(change.GroupId), cancellationToken);

        if (group == null)
        {
            return ServiceResponse.FromError(CommonErrors.GroupNotFound);
        }

        var user = await _repository.GetAsync(new UserSpec(change.UserId), cancellationToken);

        if (user == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        if (group.Admins.All(e => e.Id != requestingUser.Id))
        {
            return ServiceResponse.FromError(CommonErrors.NotAnAdmin);
        }

        if (user.Id == group.FirstAdminId && change.Role == GroupRoleEnum.Member)
        {
            return ServiceResponse.FromError(CommonErrors.NotCreator);
        }

        if (change.Role == GroupRoleEnum.Member)
        {
            group.Admins.Remove(user);
        } else
        {
            if (!group.Admins.Contains(user))
            {
                group.Admins.Add(user);
            }
        }

        await _repository.UpdateAsync(group, cancellationToken);
        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<PagedResponse<GroupMemberDTO>>> GetGroupMembers(PaginationQueryParams pagination, Guid GroupId, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<PagedResponse<GroupMemberDTO>>.FromError(CommonErrors.UserNotFound);
        }

        var group = await _repository.GetAsync(new GroupSpec(GroupId), cancellationToken);

        if (group == null)
        {
            return ServiceResponse<PagedResponse<GroupMemberDTO>>.FromError(CommonErrors.GroupNotFound);
        }

        if (!group.Users.Contains(requestingUser))
        {
            return ServiceResponse<PagedResponse<GroupMemberDTO>>.FromError(CommonErrors.NotMember);
        }

        var result = await _repository.PageAsync(pagination, new GroupMemberProjectionSpec(GroupId), cancellationToken);

        foreach (var member in result.Data)
        {
            if (group.Admins.Any(u => u.Id == member.User.Id))
            {
                member.isAdmin = true;
            } else
            {
                member.isAdmin = false;
            }
        }

        return ServiceResponse<PagedResponse<GroupMemberDTO>>.ForSuccess(result);
    }

    public async Task<ServiceResponse<GroupMemberDTO>> GetGroupMember(Guid GroupId, Guid UserId, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<GroupMemberDTO>.FromError(CommonErrors.UserNotFound);
        }

        var group = await _repository.GetAsync(new GroupSpec(GroupId), cancellationToken);

        if (group == null)
        {
            return ServiceResponse<GroupMemberDTO>.FromError(CommonErrors.GroupNotFound);
        }

        if (!group.Users.Contains(requestingUser))
        {
            return ServiceResponse<GroupMemberDTO>.FromError(CommonErrors.NotMember);
        }

        var result = await _repository.GetAsync(new UserProjectionSpec(UserId), cancellationToken);

        if (result == null)
        {
            return ServiceResponse<GroupMemberDTO>.FromError(CommonErrors.UserNotFound);
        }
        else
        {
            var member = new GroupMemberDTO
            {
                User = result,
            };
            if (group.Admins.Any(u => u.Id == result.Id))
            {
                member.isAdmin = true;
            }
            else
            {
                member.isAdmin = false;
            }

            return ServiceResponse<GroupMemberDTO>.ForSuccess(member);
        }
    }

    public async Task<ServiceResponse<GroupGetDTO>> GetGroup(Guid groupId, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<GroupGetDTO>.FromError(CommonErrors.UserNotFound);
        }

        var entity = await _repository.GetAsync(new GroupSpec(groupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse<GroupGetDTO>.FromError(CommonErrors.GroupNotFound);
        }

        if (!entity.Users.Contains(requestingUser))
        {
            return ServiceResponse<GroupGetDTO>.FromError(CommonErrors.NotMember);
        }

        var group = new GroupGetDTO
        {
            Group = new GroupDTO
            {
                Id = groupId,
                Name = entity.Name,
                NumberMembers = entity.Users.Count
            },
            GroupRole = GroupRoleEnum.Member,
        };

        if (entity.Admins.Contains(requestingUser))
        {
            group.GroupRole = GroupRoleEnum.Admin;
        }

        return ServiceResponse<GroupGetDTO>.ForSuccess(group);
    }

    public async Task<ServiceResponse<GroupDetailsDTO>> GetGroupDetails(Guid groupId, User? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse<GroupDetailsDTO>.FromError(CommonErrors.UserNotFound);
        }

        var entity = await _repository.GetAsync(new GroupSpec(groupId), cancellationToken);

        if (entity == null)
        {
            return ServiceResponse<GroupDetailsDTO>.FromError(CommonErrors.GroupNotFound);
        }

        var group = new GroupDetailsDTO
        {
            Group = new GroupDTO
            {
                Id = entity.Id,
                Color = entity.Color,
                Name = entity.Name,
                NumberMembers = entity.Users.Count,
                ShortName = entity.ShortName
            },
            IsMember = entity.Users.Any(e => e.Id == requestingUser.Id),
        };

        return ServiceResponse<GroupDetailsDTO>.ForSuccess(group);
    }

    public async Task<ServiceResponse> RemoveMember(RemoveMemberDTO remove, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        var group = await _repository.GetAsync(new GroupSpec(remove.GroupId), cancellationToken);

        if (group == null)
        {
            return ServiceResponse.FromError(CommonErrors.GroupNotFound);
        }

        var user = await _repository.GetAsync(new UserSpec(remove.UserId), cancellationToken);

        if (user == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        if (group.Admins.All(e => e.Id != requestingUser.Id))
        {
            return ServiceResponse.FromError(CommonErrors.NotAnAdmin);
        }

        if (user.Id == group.FirstAdminId)
        {
            return ServiceResponse.FromError(CommonErrors.NotCreator);
        }

        group.Users.Remove(user);
        group.Admins.Remove(user);
        await _repository.UpdateAsync(group, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteGroup(Guid id, UserDTO? requestingUser = default, CancellationToken cancellationToken = default)
    {
        if (requestingUser == null)
        {
            return ServiceResponse.FromError(CommonErrors.UserNotFound);
        }

        var group = await _repository.GetAsync(new GroupSpec(id), cancellationToken);

        if (group == null)
        {
            return ServiceResponse.FromError(CommonErrors.GroupNotFound);
        }

        if (requestingUser.Role == UserRoleEnum.Client)
        {
            if (group.Admins.All(e => e.Id != requestingUser.Id))
            {
                return ServiceResponse.FromError(CommonErrors.NotAnAdmin);
            }

            if (group.Admins.Any(e => e.Id == group.FirstAdminId))
            {
                return ServiceResponse.FromError(CommonErrors.NotCreator);
            }
        }
        await _repository.DeleteAsync(new GroupSpec(id), cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}