import React, {Fragment} from 'react';

const Vessel = ({ xPosition, yPosition }: {xPosition: number, yPosition: any}) => {

    return (
        <Fragment>
            <circle cx={xPosition} cy={yPosition} r="3" strokeWidth="1" stroke="#FF000055" fill="#FF000055">
                <animate attributeType="SVG" attributeName="r" begin="0s" dur="2.0s" repeatCount="indefinite" from="0%" to="1%"/>
                <animate attributeType="CSS" attributeName="stroke-width" begin="0s"  dur="2.0s" repeatCount="indefinite" from="0%" to="4%" />
                <animate attributeType="CSS" attributeName="opacity" begin="0s"  dur="2.0s" repeatCount="indefinite" from="1" to="0"/>
            </circle>
        </Fragment>
    )
}

export default Vessel;
