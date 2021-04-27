import React, {useState, useEffect} from 'react';
import Map from './Map';
import SearchMenu from './SearchMenu';
import TileData from "../interfaces/TileData";
import MapObject from "../interfaces/MapObject";
import CurrentFocusCoordinates from "../interfaces/CurrentFocusCoordinates";
import VesselMapObject from "../interfaces/VesselMapObject";
import PortMapObject from "../interfaces/PortMapObject";
import Requests from "../Requests";

/**
 * `MapContainer` contains the state and state handlers for a rendered map. `MapContainer` passes app level GUI logic
 * down to the `SearchMenu` and vessel and port location data down to the `Map` component. `MapContainer` updates its state
 * when a user toggles zoom modes, zooms in or out, or a background tile changes.
 *
 * `Map Container` state includes the following:
 * - root tile data
 * - current zoom mode
 * - current cursor focus
 * - tile data
 * - vessel data
 * - port data
 *
 * @returns JSX.Element that includes a `section` with nested `SearchMenu` and `Map` components.
 */
const MapContainer = () => {
    /**
     * `rootTile` is set to improve the UX. The tile listed in rootTile is used to render the tile that is displayed
     * initially.
     */
    const rootTile = {"id": 1, "ICESName": "-1", "west": 7.0, "south": 54.5, "east": 13.0, "north": 57.5,
        "scale": 1, "filename": "ROOT.png", "image_width": 2000, "image_height": 2000, "image_west": 7.0,
        "image_south": 54.31614, "image_east": 13.0, "image_north": 57.669343, "contained_by": -1}

    /**
     * The following state variables control the state of the GUI and the vessel and port data which is passed down to
     * `SearchMenu` and `Map` components.
     */
    const [currentZoom, setCurrentZoom] = useState<number>(1);
    const [zoomMode, setZoomMode] = useState<string>('');
    const [currentFocus, setCurrentFocus] = useState<CurrentFocusCoordinates>({ longitude: 0, latitude: 0 });
    const [tile, setTile] = useState<TileData>(rootTile);
    const [vessels, setVessels] = useState<VesselMapObject[]>([{imo: '123456', longitude: 8.204047217537942, latitude: 56.913153456998316}]);
    const [ports, setPorts] = useState<PortMapObject[]>([]);

    /**
     * When the component mounts, the following `useEffect` hook gets port data from the database and runs the `updateVesselPositions` function.
     */
    useEffect(() => {
        getPorts();
        updateVesselPositions();
    },[]);

    /**
     * `getPorts` gets the ports form the database and sets state level `ports` to the response.
     */
    const getPorts = async () => {
        const ports: PortMapObject[] = await Requests.getPorts();
        setPorts(mapPorts(ports));
    }

    /**
     * `updateVesselPositions` gets vessel positions from the database on the interval specified below.
     */
    const updateVesselPositions = ()  => {
        getVesselPositions();
        const interval = setInterval(() => getVesselPositions(), 20000)
        return () => {
            clearInterval(interval);
        }
    }

    /**
     * This hook updates the tile that is currently displayed when a user zooms in or out.
     */
    useEffect(() => {
        if (currentFocus["longitude"] !== 0 && currentFocus["latitude"] !== 0) {
            getTile();
        }
    }, [currentZoom]);


    /**
     * This hook runs the methods that update vessel and port locations based on the current tile data.
     */
    useEffect(() => {
        if (tile !== undefined) {
            mapVessels();
            updatePortLocations();
        } else {
            // TODO Create alert component
            console.log('Target image does not exist');
            setDefaultState();
        }
    }, [tile]);

    const setDefaultState = () => {
        setCurrentZoom(1);
        setTile(rootTile);
    }

    /**
     * `mapVessels` enriches each vessel object to include x and y positions based on the current tile's boundaries.
     */
    const mapVessels = () => {
        let newVessels: VesselMapObject[];

        newVessels = vessels.map( vessel => { return { imo: vessel["imo"], longitude: vessel["longitude"], latitude: vessel["latitude"], xPosition: calculateObjectXPosition(vessel), yPosition: calculateObjectYPosition(vessel) }});

        setVessels(newVessels);
    }

    /**
     * `updatePortLocations` recalculates x and y positions based on the current tile's boundaries.
     */
    const updatePortLocations = () => {
        let newPorts: PortMapObject[];

        newPorts = ports.map( port => { return { ...port, xPosition: calculateObjectXPosition(port), yPosition: calculateObjectYPosition(port) }});

        setPorts(newPorts);
    }

    /**
     * This function calculates the `xPosition` relative to the current tile for a given object.
     * @param targetObject
     */
    const calculateObjectXPosition = (targetObject: MapObject) => {
        return (targetObject["longitude"] - tile.image_west) / (tile.image_east - tile.image_west) * 100
    };

    /**
     * This function calculates the `yPosition` relative to the current tile for a given object.
     * @param targetObject
     */
    const calculateObjectYPosition = (targetObject: MapObject) => {
        return (tile.image_north - targetObject["latitude"]) / (tile.image_north - tile.image_south) * 100
    };

    /**
     * This function handles user clicks on the map by managing the current focus state and zoom level of the application.
     * @param e
     */
    const handleClick = (e: { preventDefault: () => void; pageX: number; pageY: number;}) => {
        let newFocus = { longitude: calculateMapX(e), latitude: calculateMapY(e)};

        setCurrentFocus(newFocus);
        changeZoom();
    }

    /**
     * This function calculates the x location of a user's click based on the current tile's boundaries and the
     * current width of the map DOM element.
     * @param e
     */
    const calculateMapX = (e: any): number => {
        let divLeft, divWidth: number;

        divLeft = document.getElementById('map')!.offsetLeft;
        divWidth = document.getElementById('map')!.offsetWidth;

        return tile.west + (tile.east - tile.west) * ((e.pageX - divLeft) / divWidth);
    }

    /**
     * This function calculates the y location of a user's click based on the current tile's boundaries and the
     * current width of the map DOM element.
     * @param e
     */
    const calculateMapY = (e: any): number => {
        let divTop, divHeight: number;

        divTop = document.getElementById('map')!.offsetTop;
        divHeight = document.getElementById('map')!.offsetHeight;

        return tile.south + (tile.north - tile.south) * (1 - ((e.pageY - divTop) / divHeight));
    }

    /**
     * This function controls the toggle of the zoom mode for the application.
     */
    const changeZoom = () => {
        switch (zoomMode) {
            case 'in':
                zoomIn();
                break;
            case 'out':
                zoomOut();
                break;
        }
    }

    /**
     * This function controls the current zoom level of the application while zooming in.
     */
    const zoomIn = () => {
        switch (currentZoom) {
            case 1:
                setCurrentZoom(2);
                break;
            case 2:
            case 3:
                setCurrentZoom(3);
                break;
        }
    }

    /**
     * This function controls the current zoom level of the application while zooming out.
     */
    const zoomOut = () => {
        switch (currentZoom) {
            case 1:
            case 2:
                setCurrentZoom(1);
                break;
            case 3:
                setCurrentZoom(2);
                break;
        }
    }

    /**
     * This function gets a background tile based on the application's current focus and zoom
     */
    const getTile = async () => {
        const imageData: TileData = await Requests.getTileData(currentFocus, currentZoom);
        setTile(imageData);
    }

    /**
     * This function enriches port objects by setting x and y positions relative to the boundaries of a current tile.
     * @param portArray
     */
    const mapPorts = (portArray: PortMapObject[]) => {
        let newPorts: PortMapObject[];

        newPorts = portArray.map( port => {
            // @ts-ignore
            // spread operator can only be used on object types
            return { ...port, xPosition: calculateObjectXPosition(port), yPosition: calculateObjectYPosition(port) }});

        return newPorts;
    }

    const getVesselPositions = () => {
        console.log('Getting updated vessel positions from AIS message endpoint.');
    }

    return (
        <section className={`map-container ${zoomMode}`}>
            <SearchMenu zoomMode={zoomMode} setZoomMode={setZoomMode}/>
            {tile && <Map currentImageId={tile.id} ports={ports} vessels={vessels} currentZoom={currentZoom} handleClick={handleClick}/> }
        </section>
    )
}

export default MapContainer;
