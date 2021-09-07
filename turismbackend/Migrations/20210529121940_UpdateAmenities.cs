using Microsoft.EntityFrameworkCore.Migrations;

namespace turismbackend.Migrations
{
    public partial class UpdateAmenities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Amenity_Locations_LocationId",
                table: "Amenity");

            migrationBuilder.AlterColumn<int>(
                name: "LocationId",
                table: "Amenity",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Amenity_Locations_LocationId",
                table: "Amenity",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Amenity_Locations_LocationId",
                table: "Amenity");

            migrationBuilder.AlterColumn<int>(
                name: "LocationId",
                table: "Amenity",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Amenity_Locations_LocationId",
                table: "Amenity",
                column: "LocationId",
                principalTable: "Locations",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
