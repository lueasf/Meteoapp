import { useEffect,useState } from "react";
import loader from "./assets/loader.svg";
import browser from "./assets/browser.svg";
import "./App.css";
const API_KEY = import.meta.env.VITE_API_KEY; // Pour importer une variable d'environnement, ici la clé

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  // rappel : useState permet de créer un état local


  useEffect(() => {
    fetch(`https://api.airvisual.com/v2/nearest_city?key=${API_KEY}`)
    .then(response => {
      if (!response.ok) throw new Error(`Error ${response.status}`) // mauvais url etc

      return response.json(); // On récupère la réponse en JSON
    })
    .then(responseData =>{
      console.log(responseData); //chercher l'imbrication
      setWeatherData({
        city: responseData.data.city,
        country: responseData.data.country,
        temperature: responseData.data.current.weather.tp,
        humidity: responseData.data.current.weather.hu,
        windVelocity : (responseData.data.current.weather.ws*3.6).toFixed(1),
        iconId : responseData.data.current.weather.ic
      });
    })
    .catch(error => {
      setErrorInfo(error.message)
    })

  }, [])
 
  return (

      // rajoute classe active qd weatherData et errorInfo sont null, donc avt la reception
      <main>
        <div className={`loader-container ${(!weatherData && !errorInfo) && "active"}`}> 
          <img src={loader} alt="loading icon"/>
        </div>
        {weatherData && (
        <>
        <p className="city-name">{weatherData.city}</p>
        <p className="country-name">{weatherData.country}</p>
        <p className="temperature">{weatherData.temperature}°</p>
        <p className="wind">- {weatherData.windVelocity} km/h -</p>
        <p className="humidity">- {weatherData.humidity} % -</p>

        <div className="info-icon-container">
          <img src={`/icons/${weatherData.iconId}.svg`} className="info-icon"alt="weather icon"/>
        </div>
        </>
        )}

      {(errorInfo && !weatherData) && (
          <>
            <p className="error-information">{errorInfo}</p>
            <img src={browser} alt="error icon"/>
          </>
        )}  
      </main>
  
  )
}

export default App;
