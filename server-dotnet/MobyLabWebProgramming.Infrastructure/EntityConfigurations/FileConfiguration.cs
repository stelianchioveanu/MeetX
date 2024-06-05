using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class FileConfiguration : IEntityTypeConfiguration<FileEntity>
{
    public void Configure(EntityTypeBuilder<FileEntity> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.Name)
            .HasMaxLength(500)
            .IsRequired();
        builder.Property(e => e.Path)
            .HasMaxLength(500)
            .IsRequired();
        builder.Property(e => e.Type)
            .HasMaxLength(500)
            .IsRequired();
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.Message)
            .WithMany(e => e.Files)
            .HasForeignKey(e => e.MessageId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.Topic)
            .WithMany(e => e.Files)
            .HasForeignKey(e => e.TopicId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
