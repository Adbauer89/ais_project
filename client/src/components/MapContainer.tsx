import React, {useState, useEffect} from 'react';

import Map from './Map';
import SearchMenu from './SearchMenu';

const MapContainer = () => {
    const [currentZoom, setCurrentZoom] = useState(1);
    const [currentImageId, setCurrentImageId] = useState(1);
    const [currentImageData, setCurrentImageData] = useState(
        {   "id": 1, "ICESName": "-1", "west": 7.0, "south": 54.5, "east": 13.0, "north": 57.5,
        "scale": 1, "filename": "ROOT.png", "image_width": 2000, "image_height": 2000, "image_west": 7.0,
        "image_south": 54.31614, "image_east": 13.0, "image_north": 57.669343, "contained_by": -1});
    const [zoomMode, setZoomMode] = useState('');
    const [currentFocus, setCurrentFocus] = useState({ longitude: 0, latitude: 0 });

    useEffect(() => {
        if (currentFocus["longitude"] !== 0 && currentFocus["latitude"] !== 0) {
            getNewImage();
        }
    }, [currentFocus])

    useEffect(() => {
        if (currentImageData !== undefined) {
            setCurrentImageId(currentImageData.id);
        }
    }, [currentImageData])

    const handleClick = (e: { preventDefault: () => void; pageX: number; pageY: number;}) => {
        e.preventDefault();
        let newFocus = {
            longitude: calculateMapX(e),
            latitude: calculateMapY(e)
        }
        setCurrentFocus(newFocus);
        changeZoom();
    }

    const getNewImage = () => {
        console.log(currentFocus.longitude);
        console.log(currentFocus.latitude);

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
        if (zoomMode === 'in') {
            zoomIn();
        } else if (zoomMode === 'out') {
            zoomOut();
        }
    }

    const zoomIn = () => {
        switch (currentZoom) {
            case 1:
                setCurrentZoom(2);
                break;
            case 2:
                setCurrentZoom(3);
                break;
            case 3:
                setCurrentZoom(3);
                break;
        }
    }

    const zoomOut = () => {
        switch (currentZoom) {
            case 1:
                setCurrentZoom(1);
                break;
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
            {currentImageId && <Map currentImageId={currentImageId} handleClick={handleClick}/> }
        </section>
    )
}

export default MapContainer;
