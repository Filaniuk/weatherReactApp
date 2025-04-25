import React from 'react'
import MySelect from './UI/Select/MySelect.jsx'
import MyInput from './UI/Input/MyInput'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker/datepickerCustom.css'
import SmallIconButton from './UI/SmallIconButton/SmallIconButton.jsx'
import { askCurrentLocation } from '../utils/geolocator.js'

export default function LocationInputForm({inputCity, setInputCity, inputDate, setInputDate, temperatureUnit, setTemperatureUnit, getWeatherForCoordinates, setLocation}) {
  return (
    <form className="locataionTemperature__inputs" onSubmit={(e) => e.preventDefault()}>
                <MyInput style={{ backgroundColor: '#383838', color: 'white', borderRadius: '10px' }}
                    value={inputCity}
                    placeholder={'Enter location...'}
                    onChange={(e) => setInputCity(e.target.value)} />
                <DatePicker
                    selected={inputDate}
                    onChange={(date) => setInputDate(date.toISOString().split('T')[0])}
                    minDate={new Date()}
                    maxDate={new Date(Date.now() + 13 * 24 * 60 * 60 * 1000)}
                    placeholderText="Select a date"
                    className='react-datepicker-wrapper'
                    customInput={<SmallIconButton style={{ textAlign: 'center' }} children={'📅'} />}
                />
                <SmallIconButton
                    onClick={async () => {
                        const userLocation = await askCurrentLocation();    
                        if (userLocation) {
                            setLocation(userLocation);
                            getWeatherForCoordinates(userLocation);
                        }
                    }}
                    style={{ marginLeft: '8px', borderRadius: '10px' }}
                    children={'🗺️'} />
                <MySelect
                    defaultValue={'Select unit'}
                    value={temperatureUnit}
                    onChange={(event) => {
                        setTemperatureUnit(event.target.value);
                    }}
                    options={[
                        { value: '°C', name: 'Celsius' },
                        { value: '°F', name: 'Fahrenheit' },
                    ]}
                    style={{ marginLeft: '6px', borderRadius: '10px' }}
                />
            </form>
  )
}
