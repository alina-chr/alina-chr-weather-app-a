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

  const [weather, setWeather] = useState(null);
  const [notFound, setNotFound] = useState(false);
  async function getWeatherData(event) {
    event.preventDefault();
    if (form.city === '') {
      alert('Add a city');
    } else {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&units=metric&appid=${apiKey}`,
        );
          if (response.status=('404')) { throw new Error ('404') }

        const  data  = await response.json()

        ;
        setWeather({
          data: data,
        });
      } catch (error) {
        if (error.message === '404'){
          setNotFound(true)
        };
      }
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
        <form onSubmit={getWeatherData}>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={(event) => handleChange(event)}
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
        {weather?.data && !notFound ? (
          <div>
            <DisplayWeather data={weather.data}></DisplayWeather>
          </div>
        ) : <p>Error</p>}
      </div>
    </>
  );
};

export default GetWeather;
