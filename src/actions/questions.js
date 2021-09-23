import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'

//({ optionOneText, optionTwoText, author }) 
function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser} = getState()
   

    dispatch(showLoading())

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
     
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}
function addAnswer (authedUser, qid, answer) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  }
}
//{ authedUser, qid, answer }
export function handleAddAnswer (qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
     
    })
      .then(() => dispatch(addAnswer(authedUser, qid, answer)))
      .then(() => dispatch(hideLoading()))
  }
}
export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

