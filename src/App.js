import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';




function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState();
  const [states, setStates] = useState();
  const [state, setState] = useState();
  const [errorText, setErrorText] = useState();
  const [occupationData, setOccupationData] = useState();
  const [occupation, setOccupation] = useState();


  const handleSubmit = async () => {
          try {
              await axios.post("https://frontend-take-home.fetchrewards.com/form", {
                      name: name,
                      email: email,
                      password: password,
                      occupation: occupation,
                      states: state,
              });

          } catch (error) {
              console.log(error.response);

              // Check if it's HTTP 400  error
              if (error.response.status === 400) {
                  console.log(`HTTP 400 error occured`);
              }
              // You can get response data (mostly the reason would be in it)
              if (error.response.data) {
                  console.log(error.response.data);
              }
              // TODO: throw error if you want to handle it somewhere
              // throw error;
          }
      };


      // axios.post("https://frontend-take-home.fetchrewards.com/form", JSON.stringify({
      //     name: name,
      //     email: email,
      //     password: password,
      //     occupation: occupation,
      //     states: state,
      // },
      //        ),
      //    )
      //    .then(res=>{
      //        console.log(res);
      //        console.log(res.data);
      //        window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
      //    })


  // if (!name || !state || !occupation || !password) {
    //   setErrorText("missing data");
    //   return;
    //  }



  useEffect(() => {

       axios.get("https://frontend-take-home.fetchrewards.com/form")
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
      <form>
      <div className="App">
        {errorText && <p style={{ color: "red" }}>Please enter a value </p>}
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
</form>
  );

}

export default App;
