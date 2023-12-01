using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BaoHiemYTe.Migrations
{
    /// <inheritdoc />
    public partial class Demo1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Benhs",
                columns: table => new
                {
                    MaBenh = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenBenh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Benhs", x => x.MaBenh);
                });

            migrationBuilder.CreateTable(
                name: "GoiBaoHiems",
                columns: table => new
                {
                    MaGoiBH = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenGoiBH = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gia = table.Column<int>(type: "int", nullable: false),
                    TiLeHoanTien = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoiBaoHiems", x => x.MaGoiBH);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    username = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstLogin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.username);
                });

            migrationBuilder.CreateTable(
                name: "ChinhSachs",
                columns: table => new
                {
                    MaCS = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaGoiBH = table.Column<int>(type: "int", nullable: false),
                    GoiBaoHiemMaGoiBH = table.Column<int>(type: "int", nullable: false),
                    BenhMaBenh = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChinhSachs", x => x.MaCS);
                    table.ForeignKey(
                        name: "FK_ChinhSachs_Benhs_BenhMaBenh",
                        column: x => x.BenhMaBenh,
                        principalTable: "Benhs",
                        principalColumn: "MaBenh",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChinhSachs_GoiBaoHiems_GoiBaoHiemMaGoiBH",
                        column: x => x.GoiBaoHiemMaGoiBH,
                        principalTable: "GoiBaoHiems",
                        principalColumn: "MaGoiBH",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KhachHangs",
                columns: table => new
                {
                    MaKH = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SDT = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SoDu = table.Column<int>(type: "int", nullable: false),
                    username = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhachHangs", x => x.MaKH);
                    table.ForeignKey(
                        name: "FK_KhachHangs_Users_username",
                        column: x => x.username,
                        principalTable: "Users",
                        principalColumn: "username",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChinhSachs_BenhMaBenh",
                table: "ChinhSachs",
                column: "BenhMaBenh");

            migrationBuilder.CreateIndex(
                name: "IX_ChinhSachs_GoiBaoHiemMaGoiBH",
                table: "ChinhSachs",
                column: "GoiBaoHiemMaGoiBH");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHangs_username",
                table: "KhachHangs",
                column: "username");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChinhSachs");

            migrationBuilder.DropTable(
                name: "KhachHangs");

            migrationBuilder.DropTable(
                name: "Benhs");

            migrationBuilder.DropTable(
                name: "GoiBaoHiems");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
