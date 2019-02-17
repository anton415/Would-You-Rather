import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

class Question extends Component {
  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This Question doesn't existed</p>
    }

    const {
      id, author, timestamp, optionOne, optionTwo
    } = question

    // console.log(this.props)

    return (
      <div className='question'>
        <img
          src={author}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(Question)
