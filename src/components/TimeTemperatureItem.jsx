import React from 'react'
import '../styles/weatherStyles/timeTemperatureItem.css'

export default function TimeTemperatureItem({formattedTime, temperature, temperatureUnit, iconLink}) {

    const dynamicClass = formattedTime.substring(0, 2) >= 6 && formattedTime.substring(0,2) < 18 ? 'time-temperature-item day' : 'time-temperature-item night';
    return (
        <div className={dynamicClass} >
            <p>{formattedTime}</p>
            <img src={iconLink} alt="Weather Icon" className="weather-icon" />
            <p style = {{fontWeight: 'bold'}}>{temperature + ' ' + temperatureUnit}</p>
        </div>
    )
}
