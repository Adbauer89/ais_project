# AIS Project

## Team Members
- Drew Thomas
- Alan Bauer

## Set Up & Installation

## Documentation

This repository includes TypeDoc generated documentation for the traffic monitoring backend, REST layer, 
and Browser-displayed map. The repository also includes code level documentation for critical methods and components
for each of the previously mentioned layers.
- `docs/client/index.html`
- `docs/server/index.html`

### Quick Lookup

The following links have been provided as a way to quickly find documentation that corresponds to project requirements.

### Project Queries

- [`PortController.getPorts`](/classes/controllers_portcontroller.default.html#getports) Read all ports 
  matching the given name and (optional) country
- [`Tile.getTileImage`](/classes/controllers_tilecontroller.default.html#gettileimage) Given a tile Id, get 
  the actual tile (a PNG file)
- [`Tile.findContainedTiles`](/classes/controllers_tilecontroller.default.html#findcontainedtiles) Given a background 
  map tile for zoom level 1 (2), find the 4 tiles of zoom level 2 (3) that are contained in it;
## Summary
This application follows the criteria for **Option C** outlined in the *project_tasks.html* document provided for the
project.

## Traffic Monitoring Backend

## Node.js REST layer for data operations

## Browser-displayed map

### Features

#### Display
- Regular interval queries for updating vessel positions
- Dynamic rendering of ports and port names based on background tile
- Dynamic rendering of last vessel location based on background tile
- Dynamic rendering of vessels based on search parameters
- Collapsible search menu
- Toggle buttons for zooming in/out and opening/closing search menu

#### Zoom
- Zoom in/out views of map
- GUI for toggling zoom modes
- Three zoom levels
- Dynamic rendering of background tile based on mouse click positions while zooming
- Error protection from zooming to undefined tiles or tiles that have not been provided

#### Search
- Input fields for searching vessels by MMSI
- Input fields for searching for vessels by destination port
