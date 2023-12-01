using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaoHiemYTe.Migrations
{
    /// <inheritdoc />
    public partial class haha : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MotaGoiBH",
                table: "GoiBaoHiems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MotaGoiBH",
                table: "GoiBaoHiems");
        }
    }
}
