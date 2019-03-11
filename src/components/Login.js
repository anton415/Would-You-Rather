import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../actions/shared'

class Login extends Component {
  state = {
    user: ''
  }

  componentDidMount() {
    this.props.authedUser && this.props.history.push('/home')
  }

  handleSelect = (user) => {
    if (user) {
      this.setState({ user })
    }
  }

  handleSubmit = () => {
    if (this.state.user !== '') {
      this.props.dispatch(authenticate(this.state.user))
      this.props.history.push('/home')
    }
  }

  render() {
    const { users } = this.props
    const { user } = this.state

    return (
      <div className='login'>
        <h1>Login</h1>
        <select value={user} onChange={(e) => this.handleSelect(e.target.value)}>
          <option value=''>Choose a user</option>
          {users && users.map((user) => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>
        <button type='submit' onClick={this.handleSubmit}>
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
            name: value.name,
        })
    );
    return {
        users: userArray,
        authedUser
    }
}

export default connect(mapStateToProps)(Login)
