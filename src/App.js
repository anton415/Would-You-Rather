import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Home
          New Question
          Leaders
          Board
        </header>
        <main className="App-main">
          <p>Welcom to the Would You Rather App!</p>
          <p>Please sign in to continue</p>

          <img src={logo} className="App-logo" alt="logo" />

          <form>
            <p>Sign in</p>
            <select>
              <option value="tyler">Tyler</option>
              <option value="anton">Anton</option>
            </select>
            <Button variant="contained" color="primary">Sign in</Button>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
