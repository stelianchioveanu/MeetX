using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class GroupConfiguration : IEntityTypeConfiguration<Group>
{
    public void Configure(EntityTypeBuilder<Group> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.Name)
            .HasMaxLength(4095)
            .IsRequired();
        builder.Property(e => e.ShortName)
            .HasMaxLength(2)
            .IsRequired();
        builder.Property(e => e.isPublic)
            .IsRequired();
        builder.Property(e => e.Color)
            .HasMaxLength(7)
            .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.FirstAdmin)
            .WithMany(e => e.MyCreatedGroups)
            .HasForeignKey(e => e.FirstAdminId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(e => e.Users)
            .WithMany(e => e.Groups);

        builder.HasMany(e => e.Admins)
            .WithMany(e => e.MyGroups);

        builder.HasOne(e => e.ParentGroup)
            .WithMany(e => e.ChildrenGroups)
            .HasForeignKey(e => e.ParentGroupId)
            .IsRequired(false);
    }
}
