import http, {IncomingMessage, ServerResponse} from "http";
import TileController from "./controllers/TileController";
import {URL} from "url";


export default http.createServer(async (request: IncomingMessage, response: ServerResponse) => {
    const requestUrl = new URL(request.url ?? '', 'http://localhost:3000');

    if (/^\/tiles\/*/.test(requestUrl.pathname) && request.method === 'GET') {
        await TileController.getTiles(request, response, requestUrl);
    } else if (/^\/tile-image\/[\-0-9]+/.test(requestUrl.pathname) && request.method === 'GET') {
        // TODO Write tests
        // TODO handle null results for id queries
        await TileController.getTileImage(request, response, requestUrl);
    } else if (/^\/tile-data\/[\-0-9]+/.test(requestUrl.pathname) && request.method === 'GET') {
        await TileController.findContainedTiles(request, response, requestUrl);
    } else {
        invalidUrl(request, response);
    }

});

const invalidUrl = (_request: IncomingMessage, response: ServerResponse) => {
    let responseData = [
        {
            "message": "Invalid endpoint"
        }
    ]

    response.statusCode = 404;
    response.setHeader('content-Type', 'Application/json');
    response.end(JSON.stringify(responseData))
}
