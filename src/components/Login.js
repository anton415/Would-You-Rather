import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../actions/shared'

class Login extends Component {

  state = {
    user: '',
    login: false
  }

  componentDidMount() {
    this.props.authedUser && this.props.history.push('/home')
  }

  handleUserSelected = (user) => {
    if(user !== '') {
      this.setState({
        user: user,
        login: false
      })
    }
  }

  handleClick = ()  => {
    if(this.state.user !== '') {
      this.props.dispatch(authenticate(this.state.user))
      this.props.match.params.id
        ? this.props.history.push(`/questions/${this.props.match.params.id }`)
        : this.props.history.push('/home')
    } else {
      this.setState({
        login: true
      })
    }
  }

  render() {
    const { users } = this.props
    const { login, user } = this.state
    return (
      <div className='login'>
        <p>Login to play</p>
        {login &&
          <div>You have to choose a user to login</div>
        }
        <select value={user} onChange={(e) => this.handleUserSelected(e.target.value)}>
          <option value=''>Choose a User</option>
          {users.length > 0 &&
            users.map((user) => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>
        <button type='submit' onClick={this.handleClick}>
          Login
        </button>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  var userArray = [];
  Object.entries(users).forEach(
    ([key, value]) =>
    userArray.push({
      id: value.id,
      name: value.name
    })
  )
  return {
    users: userArray,
    authedUser
  }
}

export default connect(mapStateToProps)(Login)
