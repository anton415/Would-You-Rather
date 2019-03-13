import React, { Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import PageNotFound from './PageNotFound'
import Login from './Login'
import Home from './Home'
import AddQuestion from './AddQuestion'
import LeaderBoard from './LeaderBoard'
import Question from './Question'
import Result from './Result'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <Fragment>
            <LoadingBar />
            {this.props.loading === true ? null :
            <Switch>
              <Route path='/' exact component={Login} />
              <Route path='/login/redirect/:id' component={Login} />
              <Route path='/login/redirect/:path' component={Login} />
              <Route path='/home' component={Home} />
              <Route path='/questions/:id' component={Question} />
              <Route path='/results/:id' component={Result} />
              <Route path='/add' component={AddQuestion} />
              <Route path='/leaderBoard' component={LeaderBoard} />
              <Route component={PageNotFound} />
            </Switch>}
          </Fragment>
        </Router>
      </div>
    )
  }
}

export default connect()(App)
