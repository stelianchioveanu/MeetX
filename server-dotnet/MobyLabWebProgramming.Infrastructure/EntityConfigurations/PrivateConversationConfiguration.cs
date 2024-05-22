using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MobyLabWebProgramming.Core.Entities;

namespace MobyLabWebProgramming.Infrastructure.EntityConfigurations;

public class PrivateConversationConfiguration : IEntityTypeConfiguration<PrivateConversation>
{
    public void Configure(EntityTypeBuilder<PrivateConversation> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.CreatedAt)
            .IsRequired();
        builder.Property(e => e.UpdatedAt)
            .IsRequired();

        builder.HasOne(e => e.User1)
            .WithMany(e => e.StartedConversations)
            .HasForeignKey(e => e.User1Id)
            .HasPrincipalKey(e => e.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(e => e.User2)
            .WithMany(e => e.ReceivedConversations)
            .HasForeignKey(e => e.User2Id)
            .HasPrincipalKey(e => e.Id)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
