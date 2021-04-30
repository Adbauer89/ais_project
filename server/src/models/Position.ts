export class Position {
    type: string;
    latitude: number | null;
    longitude: number | null;

    constructor(type: string, coordinates: number[]) {
        this.type = type;
        this.latitude = coordinates[0] ?? null;
        this.longitude = coordinates[1] ?? null;
    }

}
