using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addedPublicGroups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ParentGroupId",
                table: "Group",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "isPublic",
                table: "Group",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Group_ParentGroupId",
                table: "Group",
                column: "ParentGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Group_Group_ParentGroupId",
                table: "Group",
                column: "ParentGroupId",
                principalTable: "Group",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Group_Group_ParentGroupId",
                table: "Group");

            migrationBuilder.DropIndex(
                name: "IX_Group_ParentGroupId",
                table: "Group");

            migrationBuilder.DropColumn(
                name: "ParentGroupId",
                table: "Group");

            migrationBuilder.DropColumn(
                name: "isPublic",
                table: "Group");
        }
    }
}
