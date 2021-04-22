import CrudDao from "./CrudDao";
import Tile from "../../models/Tile";

export default interface TileDao extends CrudDao<Tile> {
    insertTileImages(): void;
    getTileImage(tileId: number): Promise<Tile>;
    findContainedTiles(tileId: number): Promise<any>;
    findTilesByCoordinates(queryObject: object): Promise<Tile[]>;
}
