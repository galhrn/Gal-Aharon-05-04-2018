const accuWeather = (() => {
  const API_KEY = "DAR9reGjaRP9iPxp8kYLpL3TlOlHhZdb";
  const baseUrl = "https://dataservice.accuweather.com";
  const filesUrl = "https://developer.accuweather.com/sites/default/files/";

  function autocomplete(country) {
    const url = `${baseUrl}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${country}`;
    return url;
  }

  function currentLocation(country) {
    const url = `${baseUrl}/locations/v1/cities/search?apikey=${API_KEY}&q=${country}`;
    return url;
  }

  function currentWeather(locationKey) {
    const url = `${baseUrl}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`;
    return url;
  }

  function fiveDaysForecast(locationKey) {
    const url = `${baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`;
    return url;
  }

  return {
    autocomplete,
    currentLocation,
    currentWeather,
    fiveDaysForecast,
    filesUrl,
  };
})();

export default accuWeather;
