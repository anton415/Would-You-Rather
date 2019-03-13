import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navigation from './Navigation'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends Component {
  componentDidMount() {
    if(this.props.authedUser === null) {
      this.props.history.push(`/login/redirect${this.props.match.path}`)
    }
  }

  state = {
    optionOne: '',
    optionTwo: '',
    optionsIncomplete: false,
    questionAdded: false
  }
  handleOptionOneChange = (optionOne) => {
    this.setState({
      optionOne,
      optionsIncomplete: false,
      questionAdded: false
    })
  }
  handleOptionTwoChange = (optionTwo) => {
    this.setState({
      optionTwo,
      optionsIncomplete: false,
      questionAdded: false
    })
  }
  handleAddQuestionClick = () => {
    if(this.state.optionOne.trim() === '' || this.state.optionTwo.trim() === ''){
      this.setState({
        optionsIncomplete: true,
        optionOne: '',
        optionTwo: ''
      })
    }
    this.props.dispatch(handleAddQuestion( this.state.optionOne, this.state.optionTwo, this.props.authedUser ))
    this.setState({ questionAdded: true, optionOne: '', optionTwo: '' })
  }

    render() {
      const { questionAdded, optionsIncomplete } = this.state
      return (
        <div className='addquestions'>
          <Navigation />
          {questionAdded &&
            <p>
              Question added. You can add more if you like
            </p>}
          <div>
            <h3>
              Add New Question
            </h3>
            <p>Complete the Question:</p>
            <p>Would you rather...</p>
            {optionsIncomplete &&
            <p>
              Please fill options one and two
            </p>}
            <input type="text" placeholder="Enter option one text here" onChange={(e) => this.handleOptionOneChange(e.target.value)}/>
            <div>Or</div>
            <input type="text" placeholder="Enter option two text here" onChange={(e) => this.handleOptionTwoChange(e.target.value)}/>
            <br />
            <button onClick={this.handleAddQuestionClick}>
              Add Question
            </button>
          </div>
        </div>
      )
    }
  }

function mapStateToProps ({ authedUser, questions }, props) {
  const { path } = props.match.path

  return {
    authedUser,
    questions,
    path
  }
}

export default connect(mapStateToProps)(AddQuestion)
