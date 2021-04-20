import {Model} from './Model';

export default class Tile implements Model {
    ices_name: string | null = null;
    west: number | null = null;
    south: number | null = null;
    east: number | null = null;
    north: number | null = null;
    scale: number | null = null;
    filename: string | null = null;
    image_width: number | null = null;
    image_height: number | null = null;
    image_west: number | null = null;
    image_east: number | null = null;
    image_north: number | null = null;
    image_south: number | null = null;
    contained_by: number | null = null;

    private constructor() {}

    public static fromJson(jsonString: string): Tile {
        const json = JSON.parse(jsonString)
        const builder = new this.Builder();
        return builder.setIcesName(json["ICESName"] ?? null)
            .setWest(json["west"] ?? null)
            .setEast(json["east"] ?? null)
            .setSouth(json["south"] ?? null)
            .setNorth(json["north"] ?? null)
            .setScale(json["scale"] ?? null)
            .setFilename(json["filename"] ?? null)
            .setImageWidth(json["image_width"] ?? null)
            .setImageHeight(json["image_height"] ?? null)
            .setImageWest(json["image_west"] ?? null)
            .setImageEast(json["image_east"] ?? null)
            .setImageNorth(json["image_north"] ?? null)
            .setImageSouth(json["image_south"] ?? null)
            .setContainedBy(json["contained_by"] ?? null)
            .build();
    }

    private static Builder = class {

        private tile: Tile;

        constructor() {
            this.tile = new Tile();
        }

        setIcesName(ices_name: string) {
            this.tile.ices_name = ices_name;
            return this;
        }

        setWest(west: number) {
            this.tile.west = west;
            return this;
        }

        setSouth(south: number) {
            this.tile.south = south;
            return this;
        }

        setEast(east: number) {
            this.tile.east = east;
            return this;
        }

        setNorth(north: number) {
            this.tile.north = north;
            return this;
        }

        setScale(scale: number) {
            this.tile.scale = scale;
            return this;
        }

        setFilename(filename: string) {
            this.tile.filename = filename;
            return this;
        }

        setImageWidth(image_width: number) {
            this.tile.image_width = image_width;
            return this;
        }

        setImageHeight(image_height: number) {
            this.tile.image_height = image_height;
            return this;
        }

        setImageWest(image_west: number) {
            this.tile.image_west = image_west;
            return this;
        }

        setImageEast(image_east: number) {
            this.tile.image_east = image_east;
            return this;
        }

        setImageNorth(image_north: number) {
            this.tile.image_north = image_north;
            return this;
        }

        setImageSouth(image_south: number) {
            this.tile.image_south = image_south;
            return this;
        }

        setContainedBy(contained_by: number) {
            this.tile.contained_by = contained_by;
            return this;
        }

        build() {
            const tile = this.tile;
            this.tile = new Tile();
            return tile;
        }

    }
}
