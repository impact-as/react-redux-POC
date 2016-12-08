import * as React from 'react';

declare function require(name: string);

export default (spots: any[]): JSX.Element => {
    return (
        <div className="spots">
            {spots.map((spotData, key) => {
                var Spot = require('../spots/' + spotData.type + '-spot.component').default;
                
                return <Spot data={spotData} key={key} />
            })}
        </div>
    );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
