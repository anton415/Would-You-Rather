import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <div className='login'>
        <header className="App-header">
          Home
          New Question
          Leaders
          Board
        </header>

        <main className="App-main">
          <p>Welcom to the Would You Rather App!</p>
          <p>Please sign in to continue</p>
          <form>
            <p>Sign in</p>
            <div className="select">
            <select>
              <option value="">Select user</option>
              <option value="tyler">Tyler</option>
              <option value="anton">Anton</option>
            </select>
            </div>
            <button variant="contained" color="primary">Sign in</button>
          </form>


        </main>
      </div>
    )
  }
}

export default Login
