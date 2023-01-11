import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';




function App() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [states, setStates] = useState();
  const [state, setState] = useState();
  const [errorText, setErrorText] = useState();
  const [occupationData, setOccupationData] = useState();
  const [occupation, setOccupation] = useState();

  console.log("name: ", name);
  console.log("occupationData: ", occupationData);

  const handleSubmit = () => {
    const data = {
      name: name,
      state: state,
      occupation: occupation,
      email: email,
    };

    if (!name || !state || !occupation) {
      setErrorText("missing data");
      return;
    }

    if(name || state || occupation){

    }

    axios
        .post("https://frontend-take-home.fetchrewards.com/form", {
          data,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  };
  useEffect(() => {
    axios
        .get("https://frontend-take-home.fetchrewards.com/form")
        .then(function (response) {
          // handle success
          console.log(response);
          setOccupationData(response.data.occupations);
          setStates(response.data.states);
        })
        .catch(function (error) {
          // handle error
          console.log( "Please enter a name");
        });
  }, []);

  return (
      <div className="App">
        {errorText && <p style={{ color: "red" }}>Error </p>}
        <label>Name:</label>
        <input
            minlength="1"
            onError={() => {
              "Please enter a name";
            }}
            onChange={(e) => setName(e.target.value)}
            type={"text"}></input>

        <label>Email</label>
        <input onChange = {(e) => setEmail(e.target.value)} type={"email"}></input>

        <label>Password</label>
        <input
            onChange={(e) => setPassword(e.target.value)}
            type = {"password"}
        ></input>
        <label>Occupations</label>
        <select onChange={(e) => setOccupation(e.target.value)}>
          {occupationData &&
              occupationData.map((data, index) => {
                return <option key={index}>{data}</option>;
              })}
        </select>
        <label>States</label>
        <select onChange = {(e) => setState(e.target.value)}>
          {states &&
              states.map((data, index) => {
                return <option key={index}>{data.name}</option>;
              })}
        </select>
        <Button onClick = {() => handleSubmit()} variant="contained" >Submit</Button>
      </div>
  );
}

export default App;
