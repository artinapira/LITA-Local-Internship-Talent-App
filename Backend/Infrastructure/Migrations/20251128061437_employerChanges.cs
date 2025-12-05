using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class employerChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_JobTypes_JobTypeId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_JobTypeId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "JobTypeId",
                table: "AspNetUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "JobTypeId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_JobTypeId",
                table: "AspNetUsers",
                column: "JobTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_JobTypes_JobTypeId",
                table: "AspNetUsers",
                column: "JobTypeId",
                principalTable: "JobTypes",
                principalColumn: "Id");
        }
    }
}
