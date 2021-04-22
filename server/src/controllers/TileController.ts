import {IncomingMessage, ServerResponse} from "http";
import {URL} from "url";
import {DatabaseConfig} from "../config/DatabaseConfig";
import TileDaoFactory from "../daos/factory/TileDaoFactory";
import {Readable} from "stream";
import TileQueryBuilder from "../queryBuilder/TileQueryBuilder";

export default class TileController {

    static getTiles = async (_request: IncomingMessage, response: ServerResponse, _requestUrl: URL) => {
        const tileQueryBuilder = new TileQueryBuilder(_requestUrl);
        const tileDao = await TileDaoFactory.getTileDao(DatabaseConfig.Mongo);
        // db.tiles.find( { west: { $lte: 7.36990595 }, east: { $gte: 7.36990595}, north: {$gte: 57.2868339}, south: {$lte: 57.2868339}, scale: 3}, { image_file: 0})

        console.log(tileQueryBuilder.buildFilterModel());

        const tiles = await tileDao.findAll(tileQueryBuilder.buildFilterModel());

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(tiles));
    }

    static getTileImage = async (_request: IncomingMessage, response: ServerResponse, _requestUrl: URL) => {
        const parentTileId = _requestUrl.pathname.split('/')[2];
        const tileDao = await TileDaoFactory.getTileDao(DatabaseConfig.Mongo);
        const tile = await tileDao.getTileImage(parseInt(<string>parentTileId, 10));

        // @ts-ignore
        // TODO Fix no overload matches
        const buffer = Buffer.from(tile.image_file, 'binary');
        const readable = new Readable();
        readable._read = () => {}; // _read is required but you can noop it
        readable.push(buffer);
        readable.push(null);

        response.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'image/png',
            'Content-Length': readable.readableLength
        });

        readable.pipe(response);
    }

    static findContainedTiles = async (_request: IncomingMessage, response: ServerResponse, _requestUrl: URL) => {
        const parentTileId = _requestUrl.pathname.split('/')[2];
        const tileDao = await TileDaoFactory.getTileDao(DatabaseConfig.Mongo);
        const tiles = await tileDao.findContainedTiles(parseInt(<string>parentTileId, 10));

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.end(JSON.stringify(tiles));
    }
}
