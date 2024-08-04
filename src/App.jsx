import { useEffect,useState } from "react";
import loader from "./assets/loader.svg";
import "./App.css";
const API_KEY = import.meta.env.VITE_API_KEY; // Pour importer une variable d'environnement, ici la clé

function App() {
  const [weatherData, setWeatherData] = useState(null);
  // rappel : useState permet de créer un état local

  useEffect(() => {
    fetch(`http://api.airvisual.com/v2/nearest_city?key=${API_KEY}`)
    .then(response => {
      return response.json(); // On récupère la réponse en JSON
    })
    .then(responseData =>{
      // console.log(responseData); //chercher l'imbrication
      setWeatherData({
        city: responseData.data.city,
        country: responseData.data.country,
        temperature: responseData.data.current.weather.tp,
        icon : responseData.data.current.weather.ic
      });
    })
  })
 
  return (

      // rajoute classe active qd weatherData est null, donc avt la reception
      <main>
        <div className={`loader-container ${!weatherData && "active"}`}> 
          <img src={loader} alt="loading icon"/>
        </div>
        {weatherData && (
        <>
        <p className="city-name">{weatherData.city}</p>
        <p className="country-name">{weatherData.country}</p>
        <p className="temperature">{weatherData.temperature}°</p>
        <div className="info-icon-container">
          <img src={`/icons/${weatherData.icon}.svg`} className="info-icon"alt="weather icon"/>
        </div>
        </>
        )}
      </main>
  
  );
}

export default App;
