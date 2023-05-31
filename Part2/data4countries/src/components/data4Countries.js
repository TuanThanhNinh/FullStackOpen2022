export const RenderCountries = ({ data, showCountryHandler }) => {
  return (
    <>
      <li>
        {data.name.official} <button onClick={showCountryHandler}>show</button>
      </li>
    </>
  );
};

export const RenderMessage = ({ message }) => {
  return (
    <>
      <p>{message}</p>
    </>
  );
};

export const RenderCountryInfo = ({ data }) => {
  if (data === null) return;
  const weatherIcon = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;

  return (
    <>
      <h2>{data.name.official}</h2>
      <p>capital {data.capital}</p>
      <p>area {data.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(data.languages).map((languages, ind) => (
          <li key={ind}>{languages}</li>
        ))}
      </ul>
      <div>
        <img
          src={data.flags.svg}
          alt={"flag"}
          style={{ objectFit: "cover", width: "200px", height: "150px" }}
        ></img>
      </div>
      <h2>Weather in {data.capital}</h2>
      <p>Temperature {data.current.temp} Celcius</p>
      <img src={weatherIcon} alt={"weather icon"}></img>
      <p>wind speed {data.current.wind_speed} m/s</p>
    </>
  );
};
