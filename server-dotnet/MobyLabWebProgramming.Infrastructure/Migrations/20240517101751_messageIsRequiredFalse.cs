using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class messageIsRequiredFalse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_PrivateConversation_ConversationId",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Topic_TopicId",
                table: "Message");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_PrivateConversation_ConversationId",
                table: "Message",
                column: "ConversationId",
                principalTable: "PrivateConversation",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Topic_TopicId",
                table: "Message",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_PrivateConversation_ConversationId",
                table: "Message");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_Topic_TopicId",
                table: "Message");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_PrivateConversation_ConversationId",
                table: "Message",
                column: "ConversationId",
                principalTable: "PrivateConversation",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Topic_TopicId",
                table: "Message",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
