import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

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
        <h3>User asks:</h3>
        <div>User img</div>
        <p>Would you rather...</p>
      </div>
    )
  }
}



export default (ViewPoll)
