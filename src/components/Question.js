import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import './Question.css';

class Question extends Component {
  render() {
    const { question } = this.props
    const { userID } = this.props
    const { users } = this.props

    if (question === null) {
      return <p>This Question doesn't existed</p>
    }

    const {
      id, author, timestamp, optionOne, optionTwo
    } = question

    let myUser = ''
    if (typeof users[userID] !== 'undefined') {
      myUser =  users[userID]
    }


    return (
      <div className='question'>
        <p>{myUser.name}</p>
        <img
          src={myUser.avatarURL}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
        <div>
          <p>Would you rather</p>
          <div>
            {optionOne.text} or {optionTwo.text}
          </div>
          <button>View Poll</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  const userID = questions[id].author

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
    userID,
    users
  }
}

export default connect(mapStateToProps)(Question)
