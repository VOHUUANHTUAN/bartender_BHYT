using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaoHiemYTe.Migrations
{
    /// <inheritdoc />
    public partial class ha : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaGoiBH",
                table: "ChinhSachs");

            migrationBuilder.AddColumn<string>(
                name: "MucDoBenh",
                table: "ChinhSachs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MucDoBenh",
                table: "ChinhSachs");

            migrationBuilder.AddColumn<int>(
                name: "MaGoiBH",
                table: "ChinhSachs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
