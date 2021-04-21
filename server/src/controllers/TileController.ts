import {IncomingMessage, ServerResponse} from "http";
import {URL} from "url";
import {DatabaseConfig} from "../config/DatabaseConfig";
import TileDaoFactory from "../daos/factory/TileDaoFactory";
import {Readable} from "stream";

export default class TileController {
    static getTileImage = async (_request: IncomingMessage, response: ServerResponse, _requestUrl: URL) => {
        const tileDao = await TileDaoFactory.getTileDao(DatabaseConfig.Mongo);
        const tile = await tileDao.getTileImage(parseInt(<string>_requestUrl.searchParams.get('id'), 10));

        // @ts-ignore
        // TODO Fix no overload matches
        const buffer = Buffer.from(tile.image_file, 'binary');
        const readable = new Readable();
        readable._read = () => {}; // _read is required but you can noop it
        readable.push(buffer);
        readable.push(null);

        response.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': readable.readableLength
        });

        readable.pipe(response);
    }

    static findContainedTiles = async (_request: IncomingMessage, response: ServerResponse, _requestUrl: URL) => {
        const tileDao = await TileDaoFactory.getTileDao(DatabaseConfig.Mongo);
        const tiles = await tileDao.findContainedTiles(parseInt(<string>_requestUrl.searchParams.get('id'), 10));

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(tiles));
    }
}
