import axios from 'axios';

export default class WeatherService {
    
    static async getWeatherForCoordinates({latitude, longitude}, temperatureUnit) {
        if(!latitude || !longitude) {
            return;
        }

        const unit = temperatureUnit === '°C' ? 'celsius' : 'fahrenheit';
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&forecast_days=14&past_days=7&timezone=auto&temperature_unit=${unit}`;
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,weather_code&forecast_days=14&past_days=7&timezone=auto&temperature_unit=${unit}`);
        return response;
    }

    static async getLatitudeLongitude(city) {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`);
        return response;
    }

    static async getCurrentUserPosition({latitude, longitude}) {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        return response;
    }

}
