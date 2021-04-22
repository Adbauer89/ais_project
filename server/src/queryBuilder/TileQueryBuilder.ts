import QueryBuilder from "./QueryBuilder";

import {URL} from "url";
import Tile from "../models/Tile";

export default class TileQueryBuilder implements QueryBuilder<Tile>{
    private readonly longitude: string | null;
    private readonly latitude: string | null;
    private readonly scale: string | null;

    constructor(requestUrl: URL) {
        this.longitude = requestUrl.searchParams.get('longitude');
        this.latitude = requestUrl.searchParams.get('latitude');
        this.scale = requestUrl.searchParams.get('scale');
    }

    buildFilterModel() :Tile
    {
        let query: any = {};

        if (this.longitude !== null) {
            query["east"] = {$gte: parseInt(this.longitude,10)};
            query["west"] = {$lte: parseInt(this.longitude,10)};
        }
        if (this.latitude !== null) {
            query["north"] = {$lte: parseInt(this.latitude,10)};
            query["south"] = {$gte: parseInt(this.latitude,10)};
        }
        if (this.scale !== null) {
            query['scale'] = parseInt(this.scale,10);
        }

        return Tile.fromJson(JSON.stringify(query));
    }
}
