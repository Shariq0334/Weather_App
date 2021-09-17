import React, { useState, useEffect , Fragment } from "react";
import swal from 'sweetalert';
import normal from './assets/normal.jpeg'
import rain from './assets/rain.jpg'
import './App.css';


function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("london");
  // const [photos, setPhotos] = useState([]);
  useEffect(() => {
    ifClicked();
  }, []);
  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=a946c629ebeb50c7a462770f0f9a9bef&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          swal("Good job!","Your location found", "success");
          return res.json();
        } else {
          if (res.status === 404) {
            return swal("Oops!","there seems to be an error (Wrong Location)!", "error");
          }
          swal("Oops!","there seems to be an error!", "danger");
          // throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
        // console.log(weather.weather.map((v,i)=>{
        //   return v.description
        // }));
      })
      .catch((error) => console.log(error));
    
  }
 return (
    
 
    <div className="app">
      
    <div className="wrapper">
    <h1 style={{color:"#576871", fontSize:"40px" }} >WEATHER APP</h1>
      
      <div className="search">
        <input
          type="text"
          value={locations}
          onChange={(e) => setLocations(e.target.value)}
          placeholder="Enter location"
          className="location_input"
        />
        <button className="location_searcher" onClick={ifClicked}>
          Search Location
        </button>
      </div>
      <div className="app__data">
        <p className="temp">Current Temparature: {weather && weather?.main?.temp}</p>
        { <p className="temp">Feels like {weather && weather?.main?.feels_like}</p>}
        { <p className="temp">HUMIDITY {weather && weather?.main?.humidity}</p> } 
         { <p className="temp">CLOUDS: {weather.weather && weather.weather.map((v,i)=>{
          return v.description
        })}</p> }   
      </div>
       <Fragment className="app__data" >
        {
          weather.weather && weather.weather.map((v,i) =>{
            return <img className="app__image" src={v.description === "overcast clouds" || v.description === "light rain" ? rain : normal} alt="" />
             } )
        }
      </Fragment> 
     {/* <img className="app__image" src={normal} alt="" /> */}
    </div>
  </div>
  );
}

export default App;
