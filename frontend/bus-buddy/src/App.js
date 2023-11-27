import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { useState , useEffect} from 'react';
import {useParams} from 'react-router';

function App() {

  const [word, setWord] = useState("inital");


  useEffect(()=>{

    axios.get(`http://localhost:8080/`)
  .then((res)=>{
    setWord(res.data);
  }).catch((err)=>{
    console.log('Error res');
  })
  })

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. 
        </p>
        <p>
          {word}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
