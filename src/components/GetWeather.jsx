import React, { useState } from 'react';
import DisplayWeather from './DisplayWeather';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

const apiKey = '84a3390bb92260f151016ba4e2fc1544';

const GetWeather = () => {
  const [form, setForm] = useState({
    city: '',
    country: '',
  });

  const [weather, setWeather] = useState([]);
  const [message, setMessage] = useState('');
  async function getWeatherData(event) {
    event.preventDefault();
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&units=metric&appid=${apiKey}`,
        );
        const  data  = await response.json();
        if (data.cod === '404') {
          setMessage(data.message)
          setWeather('')
        } else {
          setWeather({
            data: data,
          });
          setMessage('')
        };
      } catch (error) {
        console.log(error);
    }
  }

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === 'city') {
      setForm({ ...form, city: value });
    }

    if (name === 'country') {
      setForm({ ...form, country: value });
    }
  };

  return (
    <>
      <div
        className="weather-form"
        css={css`
          text-align: center;
        `}
      >
        <form onSubmit={(event) => getWeatherData(event)}>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={(event) => handleChange(event)}
            required
            css={css`
              width: 20%;
              padding: 10px 20px;
              font-weight: bold;
              border-width: 1px;
              margin-right: 5px;
              background: rgba(255, 255, 255, 0.3);
              box-sizing: border-box;
            `}
          ></input>
          <input
            type="country"
            name="country"
            placeholder="Country"
            onChange={(event) => handleChange(event)}
            css={css`
              width: 20%;
              padding: 10px 20px;
              border-width: 1px;
              background: rgba(255, 255, 255, 0.3);
              margin-right: 5px;
              box-sizing: border-box;
            `}
          ></input>
          <button
            type="submit"
            css={css`
              background-color: transparent;
              border: 1 px solid white;
              padding: 10px 15px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 15px;
              outline: none;
              background: rgba(255, 255, 255, 0.3);
              border-width: 1px;
            `}
          >
            GET WEATHER
          </button>
        </form>
        {weather?.data?.weather ? (
          <div>
            <DisplayWeather data={weather.data}></DisplayWeather>
          </div>
        ) : null}
        {message.length > 0 ? <p>{message}</p> : null}
      </div>
    </>
  );
};

export default GetWeather;
