using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class LinkGroupConfiguration : IEntityTypeConfiguration<LinkGroup>
{
    public void Configure(EntityTypeBuilder<LinkGroup> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.Token)
            .HasMaxLength(500)
            .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.Group)
            .WithOne(e => e.LinkGroup)
            .HasForeignKey<LinkGroup>(e => e.GroupId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}
