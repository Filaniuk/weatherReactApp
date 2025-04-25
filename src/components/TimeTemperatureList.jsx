import React from 'react'
import TimeTemperatureItem from './TimeTemperatureItem'
import '../styles/weatherStyles/timeTemperatureList.css'

export default function TimeTemperatureList({ timeTemperatureMap, temperatureUnit, displayLocation, searchedDate }) {

    const dateObj = new Date(searchedDate);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');  
    const year = dateObj.getFullYear();
    
    const formattedDate = `${day}/${month}/${year}`;

    return (
        <div className='timeTemperatureList'>
            <h2 style={{ textAlign: 'center'}}>Location: {displayLocation}</h2>
            <h2 style={{ textAlign: 'center'}}>Date: {formattedDate}</h2>
            <div className='timeTemperatureListContainer'>
                {[...timeTemperatureMap.entries()].map(([key, value]) => {
                    return (
                        <TimeTemperatureItem
                            key={key}
                            formattedTime={key}
                            temperature={value.temperatureValue}
                            iconLink={value.iconLink}
                            temperatureUnit={temperatureUnit}
                        />
                    );
                })}
            </div>
        </div>
    )
}
