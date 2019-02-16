export function formatQuestion (question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question

  return {
    id,
    timestamp,
    author,
    optionOne: {
      votes: optionOne.votes,
      text: optionOne.text,
    },
    optionTwo: {
      votes: optionTwo.votes,
      text: optionTwo.text,
    }
  }
}
