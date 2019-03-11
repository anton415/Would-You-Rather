import React, { Component, Fragment } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <LoadingBar />
            {this.props.loading === true ? null :
              <div>
                <Switch>
                  <Route path='/' exact component={Login} />
                </Switch>
              </div>}
          </Fragment>
        </Router>

      </div>
    );
  }
}

export default connect()(App)
