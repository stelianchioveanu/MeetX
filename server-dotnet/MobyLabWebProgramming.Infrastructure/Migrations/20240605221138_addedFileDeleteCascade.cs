using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addedFileDeleteCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileEntity_Message_MessageId",
                table: "FileEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_FileEntity_Topic_TopicId",
                table: "FileEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_PrivateConversation_ConversationId",
                table: "Message");

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntity_Message_MessageId",
                table: "FileEntity",
                column: "MessageId",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntity_Topic_TopicId",
                table: "FileEntity",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_PrivateConversation_ConversationId",
                table: "Message",
                column: "ConversationId",
                principalTable: "PrivateConversation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileEntity_Message_MessageId",
                table: "FileEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_FileEntity_Topic_TopicId",
                table: "FileEntity");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_PrivateConversation_ConversationId",
                table: "Message");

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntity_Message_MessageId",
                table: "FileEntity",
                column: "MessageId",
                principalTable: "Message",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntity_Topic_TopicId",
                table: "FileEntity",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_PrivateConversation_ConversationId",
                table: "Message",
                column: "ConversationId",
                principalTable: "PrivateConversation",
                principalColumn: "Id");
        }
    }
}
