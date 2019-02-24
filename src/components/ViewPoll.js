import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import './ViewPoll.css';

class ViewPoll extends Component {
  state = {
    option: ''
  }

  handleChange = (e) => {
    const option = e.target.value

    this.setState(() => ({
      option
    }))
  }

  handleSubmit = (e) => {
    const { option } = this.State

    // TODO: Add new opinion of question to store.

    console.log('New opinion: ', option)

    this.setState(() => ({
      option: ''
    }))
  }

  render() {
    return (
      <div className="viewPoll">
        <header>
          <h3>User asks:</h3>
        </header>
        <main>
          <div className='main-component' id='user-img'>User img</div>
          <div className='main-component'>
            <p>Would you rather...</p>
            <form>
              <input type='radio' name="option" value='optionOne'/>optionOne
              <br />
              <input type='radio' name="option" value='optionTwo'/>optionTwo
              <br />
              <button>Submit</button>
            </form>
          </div>

        </main>
      </div>
    )
  }
}



export default (ViewPoll)
