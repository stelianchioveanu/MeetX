using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addedMessageDeleteCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_Topic_TopicId",
                table: "Message");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Topic_TopicId",
                table: "Message",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_Topic_TopicId",
                table: "Message");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_Topic_TopicId",
                table: "Message",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id");
        }
    }
}
