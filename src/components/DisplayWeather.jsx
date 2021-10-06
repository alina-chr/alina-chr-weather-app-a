import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

const DisplayWeather = (props) => {
  const { data } = props;
  const icon = data.weather[0].icon;
  const city = data.name;
  const country = data.sys.country;
  const temp = Math.floor(data.main.temp);
  const feelsLike =Math.floor(data.main.feels_like);
  const minTemp = Math.floor(data.main.temp_min);
  const maxTEmp = Math.floor(data.main.temp_max);
  const description = data.weather[0].description;

  let color = '#afc7bc'
if (temp <= 15) {
  color = '#488dc2'
} else if (temp > 15){
color = '#5dcfe8'
}

  return (
    <div>
      <div css={css`
          background-color: ${color}; margin-top:10px; display:flex; flex-direction: column};
        `}>
        <div>
        <p> Today, {new Date().toLocaleDateString()}, {city}, {country} </p>
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt="icon"
          css={css`width:100px; height:100px`}
        ></img>
        </div>
        <p>{description.toUpperCase()}</p>
       <p> Temperature: {temp}<sup>o</sup>C </p>
       <p>Feels like: {feelsLike}<sup>o</sup>C </p>
       <div>
         <p>Min: {minTemp}<sup>o</sup>C</p>
         <p> Max:{maxTEmp}<sup>o</sup>C</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather;
