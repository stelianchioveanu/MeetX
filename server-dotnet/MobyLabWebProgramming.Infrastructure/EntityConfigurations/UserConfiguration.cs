﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

/// <summary>
/// This is the entity configuration for the User entity, generally the Entity Framework will figure out most of the configuration but,
/// for some specifics such as unique keys, indexes and foreign keys it is better to explicitly specify them.
/// Note that the EntityTypeBuilder implements a Fluent interface, meaning it is a highly declarative interface using method-chaining.
/// </summary>
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.Name)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.ShortName)
            .HasMaxLength(2)
            .IsRequired();
        builder.Property(e => e.Color)
            .HasMaxLength(7)
            .IsRequired();
        builder.Property(e => e.Status)
            .IsRequired();
        builder.Property(e => e.AvatarPath)
            .HasMaxLength(255)
            .IsRequired(false);
        builder.Property(e => e.Email)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Name)
            .HasMaxLength(255)
            .IsRequired();
        builder.HasAlternateKey(e => e.Email);
        builder.Property(e => e.Password)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Role)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();
    }
}
