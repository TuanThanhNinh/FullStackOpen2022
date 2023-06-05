import axios from "axios";

// const baseURL = "http://localhost:3001/persons";
// const baseURL = "http://localhost:3001/api/persons";
const baseURL = "/api/persons";
/// this URL address for the part3 which connecting with backend,  if you want to test this code for Part 2, u can use the above baseURL , remember to run another terminal for json-server

///HTTP Get request, get the data from the json-server//
const loadAll = () => {
  const request = axios.get(baseURL);
  return request
    .then((response) => response.data)
    .catch((err) =>
      console.log(`${err.message}, have some errors with HTTP GET request`)
    );
};

/// HTTP POST request, sending new resource to the json-server/
const addNew = (newPersonData) => {
  const request = axios.post(baseURL, newPersonData);
  return request
    .then((response) => response.data)
    .catch((err) =>
      console.log(`${err.message}, have some errors with HTTP Post request`)
    );
};

/// HTTP Delete request, delete a resource to the json-server/
const deleteSelect = (deleteID) => {
  const URL = `${baseURL}/${deleteID}`;
  axios
    .delete(URL)
    .catch((err) =>
      console.log(`${err.message}, have some errors with HTTP Delete request`)
    );
};

/// HTTP PUT request, modify a resource in the json-server/
const updateNumber = (id, updatedData) => {
  const URL = `${baseURL}/${id}`;
  const request = axios.put(URL, updatedData);
  return request
    .then((response) => response.data)
    .catch((err) =>
      console.log(`${err.message}, have some errors with HTTP PUT request`)
    );
};

//HTTP GET request, get specific resource from json-server
const getResource = (id) => {
  const url = `${baseURL}/${id}`;
  const request = axios.get(url);
  return request
    .then((response) => response.data)
    .catch((err) => {
      // console.log(err.message);
    });
};

const services = {
  loadAll,
  addNew,
  deleteSelect,
  updateNumber,
  getResource,
};

export default services;
