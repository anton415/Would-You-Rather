import { saveQuestionAnswer, saveQuestion } from "../utils/api"


export const RECEIVE_QUESTIONS = 'GET_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author
    })
    .then((question) => {
      dispatch(addQuestion(question))
    })
  }
}

function answerQuestion(authedUser, questionId, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    questionId,
    answer
  }
}

export function handleAnswerQuestion(authedUser, questionId, answer) {
  return (dispatch) => {
    return saveQuestionAnswer({
      questionId,
      authedUser,
      answer
    })
    .then(({authedUser, questionId, answer}) => {
      dispatch(answerQuestion(authedUser, questionId, answer))
    })
  }
}
