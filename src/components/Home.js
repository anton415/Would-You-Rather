import React, { Component } from 'react'
import Navigation from './Navigation'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Home extends Component {
  componentDidMount(){
    if(this.props.authedUser === null) {
      this.props.history.push('/')
    }
  }

  state = {
    questionType: "unanswered"
  }

  handleUnansweredQuestionsClick = () => {
    this.setState({
      questionType: "unanswered"
    })
  }

  handleAnsweredQuestionsClick = () => {
    this.setState({
      questionType: "answered",
    })
  }

  render() {
    const { myAnswers, questions, users } = this.props
    const { questionType } = this.state

    const answered = Object.values(questions)
                      .filter(question => myAnswers.includes(question.id))
                      .sort((a, b) => b.timestamp - a.timestamp)
    const unanswered = Object.values(questions)
                      .filter(question => ! myAnswers.includes(question.id))
                      .sort((a, b) => b.timestamp - a.timestamp)

    const questionsList = (questions, viewNavigation) => (
      questions.map((question) =>
      <div key={question.id}>
        <div>
          <div>
            <img src={users[question.author].avatarURL} alt='avatar'/>
          </div>
          <div >
            <p>{users[question.author].name} asks - Would you rather</p>
            <p>{question.optionOne.text}...</p>
            <p>
            {
              questionType === 'unanswered'
              ? viewPoll(question)
              : viewAnswer(question)
            }
            </p>
          </div>
        </div>
      </div>)
    )

    const viewPoll = (question) => (
      <NavLink to={`/questions/${question.id}`}>
        View Poll
      </NavLink>
    )

    const viewAnswer = (question) => (
      <NavLink to={`/results/${question.id}`}>
        View Answer
      </NavLink>
    )

    return (
      <div className='home'>
        <Navigation />
        <button onClick={this.handleUnansweredQuestionsClick}>Unanswered Questions</button>
        <button onClick={this.handleAnsweredQuestionsClick}>Answered Questions</button>

        {
          questions !== undefined &&
          questionType === 'unanswered'
          ? questionsList(unanswered)
          : questionsList(answered)
        }
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser, questions}) {
  return {
    users: users
      ? users
      : [],
    questions: questions
      ? questions
      : [],
    myAnswers: users[authedUser]
      ? Object.keys(users[authedUser].answers)
      : []
  }
}

export default connect(mapStateToProps)(Home)
