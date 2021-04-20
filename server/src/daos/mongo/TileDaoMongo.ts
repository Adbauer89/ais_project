import Tile from "../../models/Tile";
import DaoMongoCrud from "./DaoMongoCrud";
import {Db} from "mongodb";
import CrudDao from "../interface/CrudDao";

export default class TileDaoMongo extends DaoMongoCrud<Tile> implements CrudDao<Tile>  {

    constructor(database: Db) {
        super(database);
        this.collectionName = 'vessels';
        this.mongoModel = Tile.prototype;
    }

    toDocument(model: Tile): object {
        return {
            ICESName: model.ices_name,
            West: model.west,
            South: model.south,
            East: model.east,
            North: model.north,
            Scale: model.scale,
            Filename: model.filename,
            ImageWidth: model.image_width,
            ImageHeight: model.image_height,
            ImageWest: model.image_west,
            ImageEast: model.image_east,
            ImageNorth: model.image_north,
            ImageSouth: model.image_south,
            ContainedBy: model.contained_by,
        }
    }

}
