export interface IWeather {
    "coord": ICord,
    "weather": IWatchInfo[],
    "base": string,
    "main": IMain,
    "visibility": number,
    "wind": IWind,
    "clouds": IClouds,
    "dt": number,
    "sys": ISys,
    "timezone": number,
    "id": number,
    "name": string,
    "cod": number
}

interface ICord {
    "lon": number,
    "lat": number
}

interface IWatchInfo {
    "id": number,
    "main": string,
    "description": string,
    "icon": string
}

interface IMain {
    "temp": number,
    "feels_like": number,
    "temp_min": number,
    "temp_max": number,
    "pressure": number,
    "humidity": number,
    "sea_level": number,
    "grnd_level": number
}

interface IWind {
    "speed": number,
    "deg": number,
    "gust": number
}

interface IClouds {
    "all": number
}

interface ISys {
    "country": string,
    "sunrise": number,
    "sunset": number
}
