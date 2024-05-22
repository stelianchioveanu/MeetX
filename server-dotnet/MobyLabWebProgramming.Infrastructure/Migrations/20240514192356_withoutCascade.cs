using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class withoutCascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileEntity_Message_MessageId",
                table: "FileEntity");

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntity_Message_MessageId",
                table: "FileEntity",
                column: "MessageId",
                principalTable: "Message",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileEntity_Message_MessageId",
                table: "FileEntity");

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntity_Message_MessageId",
                table: "FileEntity",
                column: "MessageId",
                principalTable: "Message",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
