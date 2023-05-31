import axios from "axios";
import * as config from "./../config";

const getCountriesData = () => {
  const url = config.countriesAPI;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const services = { getCountriesData };

export default services;
