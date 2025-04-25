import { useFetching } from "./useFetching";
import WeatherService from "../api/WeatherService";
import findWeatherIcon from "../utils/weathercodes.js";
import { useEffect } from "react";

export const useFetchingWeather = (inputCity, setInputCity, inputDate, location, temperatureUnit, setLocation, setTimeTemperatureMap, setTemperatureUnits, setDisplayLocation, setIsLocationNotFound) => {
    useEffect(() => {
        if (inputCity) {
            getWeatherForCoordinates();
        }
    }, [inputDate, temperatureUnit]);

    const [getWeatherForCoordinates, isWeatherLoading, isWeatherError] = useFetching(async (customLocation = null) => {
        let defindedLocation = location;
        if (customLocation) {
            defindedLocation = customLocation;
            const responseUserLocation = await WeatherService.getCurrentUserPosition(customLocation);
            const responseUserLocationData = responseUserLocation.data;

            const formattedLocation = getFormattedLocation(responseUserLocationData.address);

            setInputCity(formattedLocation);
            setDisplayLocation(formattedLocation);
            setLocation(customLocation);
        }
        else {
            const responseLocation = await WeatherService.getLatitudeLongitude(inputCity.trim());
            if (!inputCity || responseLocation.data.length === 0) {
                setIsLocationNotFound(true);
                return;
            }
            const responseLocationData = responseLocation.data[0];
            const fetchedLatitude = responseLocationData.lat;
            const fetchedLongitude = responseLocationData.lon;
            const fetchedLocation = { latitude: fetchedLatitude, longitude: fetchedLongitude };
            defindedLocation = fetchedLocation;

            setDisplayLocation(responseLocationData.display_name);
            setLocation(fetchedLocation);
        }
        setIsLocationNotFound(false);

        const responseWeather = await WeatherService.getWeatherForCoordinates(defindedLocation, temperatureUnit);
        const responseWeatherData = responseWeather.data;

        const date = new Date();
        let slicedDate = date.toISOString().slice(0, 11);
        if (inputDate) {
            slicedDate = inputDate;
        }
        const dateIndexes = findAllIndexesForDate(slicedDate, responseWeatherData);
        const weatherCodes = findAllWeatherCodesForDateIndexes(dateIndexes, responseWeatherData);
        const timestampTemperatureMap = new Map();
        const temperatureArray = responseWeatherData.hourly.temperature_2m;
        const timeArray = responseWeatherData.hourly.time;

        dateIndexes.forEach((value, index) => {
            const dateTimeKey = timeArray[value];
            const timeFormatted = dateTimeKey.slice(11, 16);
            const temperatureValue = temperatureArray[value];
            const weatherCode = weatherCodes[index];
            const daytime = timeFormatted.substring(0, 2) >= 6 && timeFormatted.slice(0, 2) < 18 ? 'day' : 'night';
            const iconLink = findWeatherIcon(weatherCode, daytime);
            timestampTemperatureMap.set(timeFormatted, { temperatureValue: temperatureValue, iconLink: iconLink });
        })
        
        if(temperatureUnit !== responseWeatherData.hourly_units.temperature_2m) {
            setTemperatureUnits(responseWeatherData.hourly_units.temperature_2m);
        }
        setTimeTemperatureMap(timestampTemperatureMap);
    });

    function getFormattedLocation(responseAddress) {
        const displayedAdditionalArea =
            responseAddress.road
                ? responseAddress.road
                : responseAddress.suburb
                    ? responseAddress.suburb
                    : responseAddress.village;

        const formattedLocation = displayedAdditionalArea + ', '
            + responseAddress.city + ', '
            + responseAddress.country;
        return formattedLocation;
    }

    function findAllIndexesForDate(searchedDate, responseData) {
        const timeArray = responseData.hourly.time;
        const dateIndexes = [];

        for (let i = 0; i < timeArray.length; i++) {
            if (timeArray[i].startsWith(searchedDate)) {
                dateIndexes.push(i);
            }
        }

        return dateIndexes;
    }

    function findAllWeatherCodesForDateIndexes(dateIndexes, responseData) {
        const weatherCodeArray = responseData.hourly.weather_code;
        const weatherCodes = [];

        dateIndexes.forEach((index) => {
            weatherCodes.push(weatherCodeArray[index]);
        });

        return weatherCodes;
    }

    return [
        getWeatherForCoordinates,
        isWeatherLoading,
        isWeatherError
    ];
}
