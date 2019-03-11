import React, { Component } from 'react'
import Navigation from './Navigation'
import PageNotFound from './PageNotFound'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'

class Question extends Component {
  componentDidMount() {
    if(this.props.authedUser === null) {
      this.props.history.push(`/login/redirect/${this.props.match.params.id}`)
    }
  }

  state = {
    option: '',
    submitError: false
  }

  handleRadioOptionChange = (value) => {
    this.setState({
      option: value,
      submitError: false
    })
  }

  handleSubmit = () => {
    const { option } = this.state
    if(option === '') {
      this.setState({
        submitError: true
      })
    }

    this.props.dispatch(handleAnswerQuestion( this.props.authedUser, this.props.match.params.id, option ))
    this.props.history.push(`/results/${this.props.match.params.id}`)
  }

  render() {
    const { question, author } = this.props
    const { submitError } = this.state

    if(question === undefined) {
      return(<PageNotFound />)
    }

    return (
      <div className='question'>
        <Navigation />
        <div>
          {submitError &&
            <div>
              You have to select an answer
            </div>
          }
          {author &&
          <div>
            <img src={author.avatarURL} alt='avatar'/>
            <h3>
              {author.name} asks:
            </h3>
          </div>}
          <p>Would you rather?</p>
          {question &&
          <form action=''>
            <input type="radio" name="answer" value="optionOne" onChange={(e) => this.handleRadioOptionChange(e.target.value)} /> {question.optionOne.text}
            <span>Or</span>
            <input type="radio" name="answer" value="optionTwo" onChange={(e) => this.handleRadioOptionChange(e.target.value)} /> {question.optionTwo.text}
          </form>}
          <button onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions, users}, props) {
  const { id } = props.match.params
  return {
    question: questions
              ? questions[id]
              : null,
    author: users && questions[id]
              ? users[questions[id].author]
              : null,
    authedUser : authedUser
                  ? authedUser
                  : null
  }
}

export default connect(mapStateToProps)(Question)
