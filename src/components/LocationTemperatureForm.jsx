import React from 'react'
import MyButton from './UI/Button/MyButton.jsx'
import { useState } from 'react'
import { useFetchingWeather } from '../hooks/useFetchingWeather.jsx'
import TimeTemperatureList from './TimeTemperatureList.jsx'
import '../styles/weatherStyles/locationTemperatureForm.css'
import Loader from './UI/Loader/Loader.jsx'
import LocationInputForm from './LocationInputForm.jsx'

export default function LocationTemperatureForm() {
    const today = new Date().toISOString().slice(0, 10);
    const [inputCity, setInputCity] = useState('');
    const [inputDate, setInputDate] = useState(today);
    const [timeTemperatureMap, setTimeTemperatureMap] = useState(null)
    const [temperatureUnit, setTemperatureUnit] = useState('°C')
    const [displayLocation, setDisplayLocation] = useState(null)
    const [isLocationNotFound, setIsLocationNotFound] = useState(false)
    const [location, setLocation] = useState({ latitude: '', longitude: '' });

    const [getWeatherForCoordinates, isWeatherLoading, isWeatherError] = useFetchingWeather(
        inputCity,
        setInputCity,
        inputDate,
        location,
        temperatureUnit,
        setLocation,
        setTimeTemperatureMap,
        setTemperatureUnit,
        setDisplayLocation,
        setIsLocationNotFound
    );

    return (
        <div className='locationTemperature'>
            <LocationInputForm 
            inputCity={inputCity}
            setInputCity={setInputCity}
            inputDate={inputDate}
            setInputDate={setInputDate}
            temperatureUnit={temperatureUnit}
            setTemperatureUnit={setTemperatureUnit}
            getWeatherForCoordinates={getWeatherForCoordinates}
            setLocation={setLocation}
            />
            <MyButton
                onClick={async () => {
                    getWeatherForCoordinates();
                }}
                children={'Search'}
                style={{ marginTop: '3px' }}
            />

            {
                isLocationNotFound && <h2 style={{ color: 'red' }}>Location not found</h2>
            }

            {
                isWeatherError && <h2 style={{ color: 'red' }}>Error occurred while fetching weather: {isWeatherError}</h2>
            }

            {
                (isWeatherLoading && !isLocationNotFound)
                    ? <Loader />
                    : (timeTemperatureMap && timeTemperatureMap && temperatureUnit) ?
                        <TimeTemperatureList
                            searchedDate={inputDate}
                            timeTemperatureMap={timeTemperatureMap}
                            temperatureUnit={temperatureUnit}
                            displayLocation={displayLocation}
                        />
                        : ''
            }

        </div>
    )
}
