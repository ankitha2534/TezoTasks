using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DomainModelLayer.Migrations
{
    /// <inheritdoc />
    public partial class InitialSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserDetails",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    Password = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserDeta__1788CC4C14C97D7C", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "UserTasks",
                columns: table => new
                {
                    TaskId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    TaskTitle = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    TaskDescription = table.Column<string>(type: "varchar(300)", unicode: false, maxLength: 300, nullable: true),
                    TaskDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    IsDone = table.Column<bool>(type: "bit", nullable: true, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserTask__7C6949B1A735AA36", x => x.TaskId);
                    table.ForeignKey(
                        name: "FK__UserTasks__UserI__4E88ABD4",
                        column: x => x.UserId,
                        principalTable: "UserDetails",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "UQ__UserDeta__C9F284560696E998",
                table: "UserDetails",
                column: "UserName",
                unique: true,
                filter: "[UserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_UserTasks_UserId",
                table: "UserTasks",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserTasks");

            migrationBuilder.DropTable(
                name: "UserDetails");
        }
    }
}
