export function formatQuestion (question, author, authedUser) {
  const { id, optionOneText, optionTwoText, timestamp } = question

  return {
    id,
    timestamp,
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}
