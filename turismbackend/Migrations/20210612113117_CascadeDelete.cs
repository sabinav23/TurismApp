using Microsoft.EntityFrameworkCore.Migrations;

namespace turismbackend.Migrations
{
    public partial class CascadeDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_locations",
                table: "Booked_locations");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Locations",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Favorite_locations_Locations",
                table: "Favorite_locations");

            migrationBuilder.AddForeignKey(
                name: "fk_locations",
                table: "Booked_locations",
                column: "location_id",
                principalTable: "Locations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Locations",
                table: "Comments",
                column: "location_id",
                principalTable: "Locations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Favorite_locations_Locations",
                table: "Favorite_locations",
                column: "location_id",
                principalTable: "Locations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_locations",
                table: "Booked_locations");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Locations",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Favorite_locations_Locations",
                table: "Favorite_locations");

            migrationBuilder.AddForeignKey(
                name: "fk_locations",
                table: "Booked_locations",
                column: "location_id",
                principalTable: "Locations",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Locations",
                table: "Comments",
                column: "location_id",
                principalTable: "Locations",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Favorite_locations_Locations",
                table: "Favorite_locations",
                column: "location_id",
                principalTable: "Locations",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
