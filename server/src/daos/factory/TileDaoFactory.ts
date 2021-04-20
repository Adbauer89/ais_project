import TileDaoMongo from "../mongo/TileDaoMongo";
import Mongo from "../databases/Mongo";
import {DatabaseConfig} from "../../config/DatabaseConfig";
import InvalidDatabaseConfigException from "../exceptions/InvalidDatabaseConfigException";
import CrudDao from "../interface/CrudDao";
import Tile from "../../models/Tile";

export default class TileDaoFactory {
    static async getTileDao(databaseConfig: DatabaseConfig) : Promise<CrudDao<Tile>>
    {
        switch (databaseConfig.type) {
            case 'mongo':
                return new TileDaoMongo(await Mongo.getDatabase(databaseConfig));
            default:
                throw new InvalidDatabaseConfigException(`${databaseConfig.type} is not a valid database type.`);
        }

    }
}
