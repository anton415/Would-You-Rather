import React, { Component } from 'react'
import Navigation from './Navigation'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  componentDidMount() {
    if(this.props.authedUser === null) {
      this.props.history.push(`/login/redirect${this.props.match.path}`)
    }
  }
  render() {
    const { users } = this.props

    return (
      <div className='leaderBoard'>
        <Navigation />
        {users !== undefined &&
        users.map((user) =>
        <div key={user.id}>
          <div>
            <div>
              <img src={user.avatarURL} alt="avatar"/>
            </div>
            <div className="details-col">
              <p>{user.name} ({user.id})</p>
              <p>{user.answers} answered questions</p>
              <p>{user.questions} created questions</p>
            </div>
            <div>
              <p><strong>Score: {user.score}</strong></p>
            </div>
          </div>
        </div>
        )}
      </div>
      )
    }
  }

function mapStateToProps({ authedUser, users }, props) {
  const { path } = props.match.path
  var userArray = []
  Object.entries(users).forEach(
    ([key, value]) => {
      const questions = value.questions.length
      const answers = Object.keys(value.answers).length
      userArray.push({
        id: value.id,
        name: value.name,
        avatarURL: value.avatarURL,
        questions: questions,
        answers: answers,
        score: questions + answers
      })
    }
  )
  return {
    authedUser,
    users: userArray.sort((a, b) => b.score - a.score),
    path
  }
}

export default connect(mapStateToProps)(LeaderBoard)
