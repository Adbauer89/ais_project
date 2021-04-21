import http, {IncomingMessage, ServerResponse} from "http";
import TileController from "./controllers/TileController";
import {URL} from "url";


export default http.createServer(async (request: IncomingMessage, response: ServerResponse) => {
    const requestUrl = new URL(request.url ?? '', 'http://localhost:3000');

    if (requestUrl.pathname == '/tiles' && request.method === 'GET') {
        // TODO Create separate routing logic
        // TODO Write tests
        // TODO handle null results for id queries
        await TileController.getTileImage(request, response, requestUrl);
        // tileController.findContainedTiles(request, response, requestUrl);
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
