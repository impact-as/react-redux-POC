import * as React from 'react';

export default (spots: any[]): JSX.Element => {
    return (
        <div className="spots">
            {spots.map((spotData, key) => {
                var Spot = spotData.type;
                return <Spot data={spotData} />
            })}
        </div>
    );
}