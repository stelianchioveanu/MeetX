using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class addedFilesToTopic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TopicId",
                table: "FileEntity",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FileEntity_TopicId",
                table: "FileEntity",
                column: "TopicId");

            migrationBuilder.AddForeignKey(
                name: "FK_FileEntity_Topic_TopicId",
                table: "FileEntity",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileEntity_Topic_TopicId",
                table: "FileEntity");

            migrationBuilder.DropIndex(
                name: "IX_FileEntity_TopicId",
                table: "FileEntity");

            migrationBuilder.DropColumn(
                name: "TopicId",
                table: "FileEntity");
        }
    }
}
