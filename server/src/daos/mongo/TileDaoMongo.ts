import Tile from "../../models/Tile";
import DaoMongoCrud from "./DaoMongoCrud";
import {Db} from "mongodb";
import CrudDao from "../interface/CrudDao";
import * as fs from "fs";

export default class TileDaoMongo extends DaoMongoCrud<Tile> implements CrudDao<Tile> {

    constructor(database: Db) {
        super(database);
        this.collectionName = 'tiles';
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
            ImageFile: model.image_file
        }
    }

    async insertTileImages() {
        let tileImageDirectory = './src/images/'
        let tileImages = fs.readdirSync(tileImageDirectory);

        tileImages.forEach( tileImage => {
            let binaryImage = fs.readFileSync(tileImageDirectory+tileImage).toString('binary');
            this.database.collection(this.collectionName).updateOne({filename: tileImage},{$set: {image_file: binaryImage}});
        });
    }


    async getTileImage(tileId: number) : Promise<Tile>
    {
        const image = await this.database.collection(this.collectionName).findOne({ id: tileId });

        // @ts-ignore
        // Cannot use reflection with typescript, so the ModelImpl prototype is used to call its static method.
        return this.mongoModel.constructor.fromJson(JSON.stringify(image));
    }

    async findContainedTiles(tileId: number) {
        const tiles = await this.database.collection(this.collectionName).find({contained_by: tileId}, {projection: {image_file: 0}}).toArray();

        return tiles.map((tile: any) => {
            // @ts-ignore
            // Cannot use reflection with typescript, so the ModelImpl prototype is used to call its static method.
            return this.mongoModel.constructor.fromJson(JSON.stringify(tile));
        });
    }

}
