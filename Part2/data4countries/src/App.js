import { useState } from "react";
import services from "./services/data4countries";
import * as Componets from "./components/data4Countries";
import axios from "axios";
import { weatherApiKey } from "./config";

function App() {
  //setup State
  const [input, setInput] = useState("");
  const [listCountries, setListCountries] = useState([]);
  const [choosenCountry, setChoosenCountry] = useState(null);
  const [message, setMessage] = useState("");

  const getWeatherData = async function (selectedCountries) {
    try {
      const [lat, lng] = selectedCountries[0].capitalInfo.latlng;

      const weatherData = await axios
        .get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&units=metric&lon=${lng}&exclude=hours,daily&appid=${weatherApiKey}`
        )
        .then((response) => response.data);

      const finalData = Object.assign(selectedCountries[0], weatherData);
      console.log(finalData);

      setChoosenCountry(finalData);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCountries = (name) => {
    services.getCountriesData().then((data) => {
      const selectedCountries = data.filter((country) =>
        country.name.official.toLowerCase().includes(name.toLowerCase())
      );

      if (selectedCountries.length === 1) {
        setMessage("");
        setListCountries([]);

        return getWeatherData(selectedCountries);
      }

      if (selectedCountries.length < 10) {
        setMessage("");
        setChoosenCountry(null);

        return setListCountries(selectedCountries);
      }

      if (selectedCountries.length > 10) {
        setListCountries([]);
        setChoosenCountry(null);

        return setMessage("Too many matched, specify another filter");
      }
    });
  };

  const showBtn = (country) => {
    setMessage("");
    setListCountries([]);
    setInput("");

    setChoosenCountry([country]);
  };

  return (
    <>
      <label htmlFor="findCountries">find countries</label>
      <input
        id="findCountries"
        type="text"
        value={input}
        onChange={(e) => {
          getCountries(e.target.value);
          setInput(e.target.value);
        }}
      ></input>

      <Componets.RenderMessage message={message} />

      <Componets.RenderCountryInfo data={choosenCountry} />

      <ul>
        {listCountries.map((country, ind) => (
          <Componets.RenderCountries
            key={ind}
            data={country}
            showCountryHandler={() => showBtn(country)}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
