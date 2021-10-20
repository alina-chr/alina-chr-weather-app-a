import React, { useState, useEffect, useCallback } from 'react';
import DisplayWeather from './DisplayWeather';
import { css, cx } from '@emotion/css';

// let prevHandleSubmit = null;
const apiKey = '84a3390bb92260f151016ba4e2fc1544';

async function getWeatherData(city, country, options) {
  const payload = {};

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`,
      options,
    );
    const data = await response.json();
    if (data.cod === '404') {
      payload.message = data.message;
    } else {
      payload.data = { data: data };
      payload.message = '';
    }
  } catch (error) {
    payload.error = error;
    console.log('a crapat requestul');
  }
  console.log(payload);
  return payload;
}

const GetWeather = () => {
  const [form, setForm] = useState({
    city: '',
    country: '',
  });

  const [weather, setWeather] = useState();
  const [message, setMessage] = useState('');
  // const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const formEl = event.target;
    const city = formEl.city.value;
    const country = formEl.country.value;
    setForm({ city: city, country: country });
    // setLoading(city);
  }, []);
  // console.log(handleSubmit === prevHandleSubmit);
  // prevHandleSubmit = handleSubmit;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const options = { signal: signal };
    if (form.city || form.country) {
      getWeatherData(form.city, form.country, options).then((payload) => {
        // if (payload.data.data.name.toLowerCase() === loading.toLowerCase()) {
        if (payload.error) {
          setWeather();
          setMessage(payload.error.message);
        } else {
          setWeather(payload.data);
          setMessage(payload.message);
        }
        // }
      });
    } else {
      setMessage('Search a city');
      setWeather();
    }
    return () => {
      controller.abort();
    };
  }, [form]);

  return (
    <>
      <div
        className={cx(
          'weather-form',
          css`
            text-align: center;
          `,
        )}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            className={css`
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
            type="text"
            name="country"
            placeholder="Country"
            className={css`
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
            className={css`
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
