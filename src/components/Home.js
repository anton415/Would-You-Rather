import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
    componentDidMount() {
      if(this.props.authedUser === null) {
        this.props.history.push('/')
      }
    }

    state = {
      questionType: "unanswered"
    }

    handleUnansweredQuestionsClick = () => {
      this.setState({
        questionType: "unanswered",
      })
    }

    handleAnsweredQuestionsClick = () => {
      this.setState({
        questionType: "answered",
      })
    }

    render() {
      const { userAnswers, questions, users } = this.props
      const { questionType } = this.state
      
      const answered = Object.values(questions)
                        .filter(question => userAnswers.includes(question.id))
                        .sort((a, b) => b.timestamp - a.timestamp)
      const unanswered = Object.values(questions)
                        .filter(question => ! userAnswers.includes(question.id))
                        .sort((a, b) => b.timestamp - a.timestamp)

      const listWithQuestions = (questions) => (
        questions.map((question) => (
          <div key={question.id}>
            <div>
              <div>
                <img src={users[question.author].avatarURL} alt="avatar"/>
              </div>
              <div>
                <p>{users[question.author].name} asks - Would you rather</p>
                <p><strong>{question.optionOne.text}...</strong></p>
              </div>
            </div>
          </div>
        ))
      )

      return (
          <div className="home">
            <button onClick={this.handleUnansweredQuestionsClick}>Unanswered Questions</button>
            <button onClick={this.handleAnsweredQuestionsClick}>Answered Questions</button>
            {
              questionType === "unanswered"
              ? listWithQuestions(unanswered)
              : listWithQuestions(answered)
            }
          </div>
      );
    }
  }
function mapStateToProps ({ users, authedUser, questions }) {
  return {
    users: users
      ? users
      : [],
    questions: questions
      ? questions
      : [],
    userAnswers: users[authedUser]
      ? Object.keys(users[authedUser].answers)
      : []
  }
}

export default connect(mapStateToProps)(Home)
