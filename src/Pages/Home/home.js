import React, { useState } from 'react'
import style from './home.module.css'
import { images } from '../../Assets/Images'
import axios from 'axios';
import { recent5searches, weatherTimeFormator } from '../../Helper/helper';

const Home = () => {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [timeSet, setTimeSet] = useState({});
  const [search, setSearch] = useState([]);

  const handleChange = () => {
    function kelvintotemp(value) {
      return value - 273.15;
    }

    axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e6b7794bdf5790f11f09454f10aaf379`).then((res) => {
      if (res.status === 200) {
        let tempVal = res.data.main.temp;
        let finalValue = kelvintotemp(tempVal).toFixed(0)
        setTemp(finalValue);
        setWind(res.data.wind.speed)
        setHumidity(res.data.main.humidity)
        let timeValue = weatherTimeFormator(res.data.sys.sunrise ,res.data.sys.sunset );
        setTimeSet(timeValue)
        setWeather(res.data.weather[0].main)
        recent5searches(city);
        console.log(res.data, "datatatattata>>>>>>" ,finalValue)
      }
    }).catch((err) => {
      console.log(err, "error")
    })
  }

const handleFocus = ()=>{
let saveSearch = JSON.parse(localStorage.getItem('recentSearches'))
setSearch(saveSearch);
}

const handleSelected = (item)=>{
  setCity(item);
}

  return (
    <div className={style.mainBox}>
      <div className={style.searchbox}>
        <div class="row g-3 align-items-center">
          <div class="col-auto">
            <input type="text" class="form-control" value={city} onChange={(e) => setCity(e.target.value)} onFocus={handleFocus}/>
            <button className={style.btnclr} onClick={handleChange}>Search</button>
            <ul className={style.recentsearch}>
              {
                search?.map((item , index)=>(
                  <li key={index} onClick={()=>handleSelected(item)} >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className={style.weatherbox}>
        <div className={style.innerbox}>
          <h1>{city ? city : "Enter City"}</h1>
          <div className={style.imageWrap}>
            <img className={style.imgBox} src={weather == 'Clear' ? images.clear : weather == 'Clouds' ? images.thunder : images.cloudy} alt='weather' />
          </div>
          <div className={style.suntimeWrap}>
            <span>Sunrise- {timeSet.sunriseTime}</span>
            <span>Sunset- {timeSet.sunsetTime}</span>
          </div>
          <h1 className={style.temp}>{temp}<sup>°</sup> C</h1>
          <h3 className={style.weatherTime}>{weather} <span>{timeSet.timeInIST}</span></h3>
          <div className={style.iconBox}>
            <div className={style.humidity}>
              <img className={style.imgBox1} src={images.humidity} alt='weather' />
              <span>H:{humidity}%</span>
            </div>
            <div className={style.wind}>
              <img className={style.imgBox1} src={images.wind} alt='weather' />
              <span>{wind.toFixed(0)} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
