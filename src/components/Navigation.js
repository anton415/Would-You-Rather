import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { authenticate } from '../actions/shared'

class Navigation extends Component {
  handleLogout = () => {
    this.props.dispatch(authenticate(''))
    this.props.history.push('/')
  }

  componentDidMount() {
    this.props.authedUser === '' && this.props.history.push('/')
  }

  render() {
    const { avatar, name } = this.props
    return (
      <div className='navigation'>
        <div>
          <img src={avatar} alt='avatar'/>
          <p>Hello, {name}</p>
          <button onClick={this.handleLogout}>
            Logout
          </button>
        </div>
        <div>
          <NavLink exact to='/home'>
            <button>Home</button>
          </NavLink>
          <NavLink exact to='/add'>
            <button>Add Question</button>
          </NavLink>
          <NavLink exact to='/leaderboard'>
            <button>LeaderBoard</button>
          </NavLink>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  if(users[authedUser] !== undefined ) {
    return {
      authedUser: authedUser,
      name: users[authedUser].name,
      avatar: users[authedUser].avatarURL
    }
  }
  return {authedUser: ''}
}

export default withRouter(connect(mapStateToProps)(Navigation))
