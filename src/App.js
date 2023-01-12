import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

function App() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState();
    const [states, setStates] = useState();
    const [state, setState] = useState();
    const [errorText, setErrorText] = useState();
    const [submitSuccess, setsubmitSuccess] = useState();
    const [occupationData, setOccupationData] = useState();
    const [occupation, setOccupation] = useState();


    const handleSubmit = async () => {

        axios.post("https://frontend-take-home.fetchrewards.com/form", {
                "name": name,
                "email": email,
                "password": password,
                "occupation": occupation,
                "state": state,
            },
        )
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

        if (!name || !state || !occupation || !password) {
            setErrorText("missing data");
            return;
        }else{
            setsubmitSuccess("Congratulations! Form submited successfully!");
        }
    }

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
                console.log("Please enter a name");
            });
    }, []);


  return (

      <div className="App">
      <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box
                      component="form"
                      sx={{
                          marginTop: 5,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: 500,
                          maxWidth: '100%',
                          '& .MuiTextField-root': { m: 1 },
                      }}
                  >
                      <TextField onChange={(e) => setName(e.target.value)}
                                 type={"text"}fullWidth label="Full Name" id="fullWidth" />
                      <TextField onChange={(e) => setEmail(e.target.value)}
                                 type={"email"}fullWidth label="Email" id="fullWidth" />
                      <TextField onChange={(e) => setPassword(e.target.value)}
                                type={"password"}fullWidth label="Password" id="fullWidth" />

          <TextField select onChange={(e) => setOccupation(e.target.value)} fullWidth label="Occupations" id="fullWidth"/>
              {occupationData &&
                  occupationData.map((data, index) => {
                      return <option key={index}>{data}</option>;
                  })}


          <label>States</label>
          <select onChange={(e) => setState(e.target.value)}>
              {states &&
                  states.map((data, index) => {
                      return <option key={index}>{data.name}</option>;
                  })}
                 </select>
                   <Button onClick={() => handleSubmit()} fullWidth variant="contained">Submit</Button>
                      {errorText && <p style={{color: "red"}}>Please fill out all required fields </p>}
                        {submitSuccess && <p style={{color: "green"}}>Congratulations! Form submitted successfully! </p>}
                  </Box>
      </Container>
</ThemeProvider>
</div>
  );

}

export default App;
