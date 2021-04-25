import PortDaoMongo from "../mongo/PortDaoMongo";
import Mongo from "../databases/Mongo";
import {DatabaseConfig} from "../../config/DatabaseConfig";
import InvalidDatabaseConfigException from "../exceptions/InvalidDatabaseConfigException";
import PortDao from "../interface/PortDao";

export default class PortDaoFactory {
    static async getPortDao(databaseConfig: DatabaseConfig): Promise<PortDao>
    {
        switch (databaseConfig.type) {
            case 'mongo':
                return new PortDaoMongo(await Mongo.getDatabase(databaseConfig));
            default:
                throw new InvalidDatabaseConfigException(`${databaseConfig.type} is not a valid database type.`);
        }

    }
}
