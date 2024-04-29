using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;
using System.Reflection.Metadata;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class ResetTokenConfiguration : IEntityTypeConfiguration<ResetToken>
{
    public void Configure(EntityTypeBuilder<ResetToken> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.Token)
            .HasMaxLength(4095)
            .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.User)
            .WithOne(e => e.ResetToken)
            .HasForeignKey<ResetToken>(e => e.UserId)
            .IsRequired()
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}
