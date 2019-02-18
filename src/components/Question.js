import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatUser } from '../utils/helpers'

class Question extends Component {
  render() {
    const { question } = this.props
    const { userID } = this.props
    const { users } = this.props

    if (question === null) {
      return <p>This Question doesn't existed</p>
    }
    if (userID === null) {
      return <p>This User doesn't existed</p>
    }

    const {
      id, author, timestamp, optionOne, optionTwo
    } = question

    // const {
    //   userID, name, avatarURL, answers, questions
    // } = user
    var myUser = ''
    console.log(this.props)
    console.log('User id: ', userID)
    console.log('Users: ', users)
    console.log('User id in all users: ', users[userID])
    if (typeof users[userID] !== 'undefined') {
      myUser =  users[userID]
      console.log("My user: ", myUser)
      const nameOfUser = myUser['name']
      console.log("My user's name: ", nameOfUser)
    }


    return (
      <div className='question'>
        <img
          src={myUser.avatarURL}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
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
