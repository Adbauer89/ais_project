import {IncomingMessage, ServerResponse} from "http";
import {URL} from "url";
import {DatabaseConfig} from "../config/DatabaseConfig";
import PortDaoFactory from "../daos/factory/PortDaoFactory";
import PortQueryBuilder from "../queryBuilder/PortQueryBuilder";

export default class PortController {
    static getPorts = async (_request: IncomingMessage, response: ServerResponse, requestUrl: URL) => {
        const portQueryBuilder = new PortQueryBuilder(requestUrl);
        const portDao = await PortDaoFactory.getPortDao(DatabaseConfig.Mongo);
        const ports = await portDao.findAll(portQueryBuilder.buildFilterModel());

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.end(JSON.stringify(ports));
    }
}
