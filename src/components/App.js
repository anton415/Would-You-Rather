import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <LoadingBar />
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
            <div className="select">
            <select>
              <option value="">Select user</option>
              <option value="tyler">Tyler</option>
              <option value="anton">Anton</option>
            </select>
            </div>

            <Button variant="contained" color="primary">Sign in</Button>
          </form>

          {this.props.loading === true
            ? null
            : <Dashboard />}
        </main>
      </div>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
