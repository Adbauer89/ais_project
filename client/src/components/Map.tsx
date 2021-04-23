import React, {Fragment} from 'react';
import Vessel from "./Vessel";

const Map = ({ currentImageId, vessels, handleClick }: {currentImageId: number, vessels: any[], handleClick: any}) => {

    return (
        <Fragment>
            <div className={`map-image-container`} id={`map`} onClick={handleClick}>
                <svg viewBox="0 0 100 100"
                     className="map-image"
                     style={{backgroundImage: `url("http://localhost:3001/tile-image/${currentImageId}")`,
                         backgroundSize: `cover`}}>
                    { vessels && vessels.map( vessel => {return <Vessel xPosition={vessel.xPosition} yPosition={vessel.yPosition}/>;}) }

                </svg>
            </div>
        </Fragment>
    )
}

export default Map;
