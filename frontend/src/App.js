// import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/forms/register';
import React, { useState } from 'react';
import Nav from './components/navigation/Nav';
import Button from '@mui/material/Button';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <Router>
          <Nav loggedIn={loggedIn}/>
          <Button variant="contained"> Hello World</Button>
          <Routes>
            <Route exact path="/" element={<Home/>}> </Route>
            <Route exact path="/About" element={<About/>}> </Route>
            <Route exact path="/Contact" element={<Contact/>}> </Route>
            <Route exact path="/register" element={<Signup/>}> </Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
