using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaoHiemYTe.Migrations
{
    /// <inheritdoc />
    public partial class demo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "MaHDKhamBenh",
                table: "YeuCauHoanTra",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_YeuCauHoanTra_MaHDKhamBenh",
                table: "YeuCauHoanTra",
                column: "MaHDKhamBenh",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_YeuCauHoanTra_MaHDKhamBenh",
                table: "YeuCauHoanTra");

            migrationBuilder.AlterColumn<string>(
                name: "MaHDKhamBenh",
                table: "YeuCauHoanTra",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
