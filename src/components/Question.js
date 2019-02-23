import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import './Question.css';

class Question extends Component {
  viewPoll = (e, id) => {
    e.preventDefault()
    // todo: Redirect to ViewPollPage.js
  }

  render() {
    const { question } = this.props
    const { userID } = this.props
    const { users } = this.props

    if (question === null) {
      return <p>This Question doesn't existed</p>
    }

    const {
      id, author, optionOne, optionTwo
    } = question

    let myUser = ''
    if (typeof users[userID] !== 'undefined') {
      myUser =  users[userID]
    }


    return (

      <div className='question'>
        <div className='question_header'>
          <p>{myUser.name} asks:</p>
        </div>
        <div className='question_component'>
          <img
            src={myUser.avatarURL}
            alt={`Avatar of ${author}`}
            className='avatar'
          />
        </div>
        <div className='question_component'>
          <p>Would you rather</p>
          <div>
            {optionOne.text} or {optionTwo.text}
          </div>
          <button className='button' onClick={(e) => this.viewPoll(e, question.id)}>
            View Poll
          </button>
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
