import React, {useState, useEffect} from 'react';
import Map from './Map';
import SearchMenu from './SearchMenu';
import ImageData from "../interfaces/ImageData";
import Vessel from "../interfaces/Vessel";
import CurrentFocusCoordinates from "../interfaces/CurrentFocusCoordinates";

const MapContainer = () => {
    const rootImage = {"id": 1, "ICESName": "-1", "west": 7.0, "south": 54.5, "east": 13.0, "north": 57.5,
        "scale": 1, "filename": "ROOT.png", "image_width": 2000, "image_height": 2000, "image_west": 7.0,
        "image_south": 54.31614, "image_east": 13.0, "image_north": 57.669343, "contained_by": -1}

    const [currentZoom, setCurrentZoom] = useState<number>(1);
    const [currentImageId, setCurrentImageId] = useState<number>(1);
    const [zoomMode, setZoomMode] = useState<string>('');
    const [currentFocus, setCurrentFocus] = useState<CurrentFocusCoordinates>({ longitude: 0, latitude: 0 });
    const [currentImageData, setCurrentImageData] = useState<ImageData>(rootImage);
    const [vessels, setVessels] = useState<Vessel[]>([{longitude: 8.204047217537942, latitude: 56.913153456998316}]);

    useEffect(() => {
        if (currentFocus["longitude"] !== 0 && currentFocus["latitude"] !== 0) {
            getNewImage();
        }
    }, [currentZoom]);

    useEffect(() => {
        if (currentImageData !== undefined) {
            setCurrentImageId(currentImageData.id);
            mapVessels();
        } else {
            console.log('Target image does not exist');

            // TODO Replace with query image by id
            setCurrentImageData(rootImage);
        }

    }, [currentImageData]);

    const mapVessels = () => {
        let newVessels: Vessel[];

        newVessels = [];

        vessels.map( vessel => {
            newVessels.push(
                {
                    longitude: vessel["longitude"],
                    latitude: vessel["latitude"],
                    xPosition: calculateVesselXPosition(),
                    yPosition: calculateVesselYPosition(),
                }
            )
        });

        setVessels(newVessels);
    }

    const calculateVesselXPosition = () => {
        return (vessels[0]["longitude"] - currentImageData.image_west) / (currentImageData.image_east - currentImageData.image_west) * 100
    };

    const calculateVesselYPosition = () => {
        return (currentImageData.image_north - vessels[0]["latitude"]) / (currentImageData.north - currentImageData.image_south) * 100
    };

    const handleClick = (e: { preventDefault: () => void; pageX: number; pageY: number;}) => {
        e.preventDefault();

        if (currentImageData !== undefined) {
            let newFocus = {
                longitude: calculateMapX(e),
                latitude: calculateMapY(e)
            }

            setCurrentFocus(newFocus);

            changeZoom();
        }
    }

    const getNewImageById = (imageId: number) => {
        fetch(`http://localhost:3001/tile-image/${imageId}`)
            .then(response => response.json())
            .then(data => setCurrentImageData(data[0]));
    }

    const getNewImage = () => {
        fetch(`http://localhost:3001/tiles?longitude=${currentFocus.longitude}&latitude=${currentFocus.latitude}&scale=${currentZoom}`)
            .then(response => response.json())
            .then(data => setCurrentImageData(data[0]));
    }

    const calculateMapX = (e: any): number => {
        let divLeft, divWidth: number;

        divLeft = document.getElementById('map')!.offsetLeft;
        divWidth = document.getElementById('map')!.offsetWidth;

        return currentImageData.west + (currentImageData.east - currentImageData.west) * ((e.pageX - divLeft) / divWidth);
    }

    const calculateMapY = (e: any): number => {
        let divTop, divHeight: number;

        divTop = document.getElementById('map')!.offsetTop;
        divHeight = document.getElementById('map')!.offsetHeight;

        return currentImageData.south + (currentImageData.north - currentImageData.south) * (1 - ((e.pageY - divTop) / divHeight));
    }

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

    return (
        <section className={`map-container ${zoomMode}`}>
            <SearchMenu zoomMode={zoomMode} setZoomMode={setZoomMode}/>
            {currentImageId && <Map currentImageId={currentImageId} vessels={vessels} handleClick={handleClick}/> }
        </section>
    )
}

export default MapContainer;
