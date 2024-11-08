﻿using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Entities;

/// <summary>
/// This is an example for a user entity, it will be mapped to a single table and each property will have it's own column except for entity object references also known as navigation properties.
/// </summary>
public class User : BaseEntity
{
    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
    public string ShortName { get; set; } = default!;
    public string Color { get; set; } = default!;
    public string Position { get; set; } = default!;
    public string AvatarPath { get; set; } = default!;
    public bool Status { get; set; } = default!;
    public UserRoleEnum Role { get; set; } = default!;
    public RefreshToken? RefreshToken { get; set; }
    public ResetToken? ResetToken { get; set; }
    public ICollection<Topic> MyTopics { get; set; } = default!;
    public ICollection<Group> MyCreatedGroups { get; set; } = default!;
    public ICollection<Group> MyGroups { get; set; } = default!;
    public ICollection<Group> Groups { get; set; } = default!;
    public ICollection<UserRecentTopics> MyRecentTopics { get; set; } = default!;
    public ICollection<Message> Messages { get; set; } = default!;
    public ICollection<PrivateConversation> StartedConversations { get; set; } = default!;
    public ICollection<PrivateConversation> ReceivedConversations { get; set; } = default!;
}
