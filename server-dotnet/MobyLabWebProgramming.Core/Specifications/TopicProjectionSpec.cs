﻿using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using MobyLabWebProgramming.Core.DataTransferObjects;
using MobyLabWebProgramming.Core.Entities;
using MobyLabWebProgramming.Core.Enums;

namespace MobyLabWebProgramming.Core.Specifications;

public sealed class TopicProjectionSpec : BaseSpec<TopicProjectionSpec, Topic, TopicDTO>
{
    protected override Expression<Func<Topic, TopicDTO>> Spec => e => new()
    {
        Id = e.Id,
        Title = e.Title,
        Description = e.Description,
        CreatedDate = e.CreatedAt,
        User = new UserDTO
        {
            Id = e.User.Id,
            Email = e.User.Email,
            Name = e.User.Name,
            Role = e.User.Role
        },
        NumberAnswers = 2
    };

    public TopicProjectionSpec(bool orderByCreatedAt = true) : base(orderByCreatedAt)
    {
    }

    public TopicProjectionSpec(Guid Id)
    {
        Query.Where(e => e.Id == Id).OrderByDescending(x => x.CreatedAt, true);
    }

    public TopicProjectionSpec(string? search, Guid groupId)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            Query.Where(e => e.GroupId == groupId).OrderByDescending(x => x.CreatedAt, true);
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => (EF.Functions.ILike(e.Title, searchExpr) || EF.Functions.ILike(e.Description, searchExpr)) && e.GroupId == groupId).OrderByDescending(x => x.CreatedAt, true);
    }

    public TopicProjectionSpec(string? search, Guid groupId, Guid userId)
    {
        Query.Where(e => e.GroupId == groupId && e.UserId == userId).OrderByDescending(x => x.CreatedAt, true);
    }
}