import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
  SET_IS_FETCHING,
  SET_ERROR,
  RESET_SELECTED_STATE
} from './action-types'

import axios from 'axios'

export function moveClockwise() {
  return ({ type: MOVE_CLOCKWISE })
 }

export function moveCounterClockwise() {
  return ({ type: MOVE_COUNTERCLOCKWISE })
 }

export const selectAnswer = (id) => { 
  return {type: SET_SELECTED_ANSWER, payload: id}
}

export function setMessage(message) {
  return ({type: SET_INFO_MESSAGE, payload: message})
 }

export function setQuiz() { }

export const inputChange = (data) => {
  return {
    type: INPUT_CHANGE, payload: data
  }
 }

 export function resetForm() {
  return {
    type: RESET_FORM
  }
 }

export const fetchQuiz = () => dispatch => {
  dispatch(setIsFetching(false));
  axios.get(`http://localhost:9000/api/quiz/next`)
  .then(res => {
    dispatch(setQuizIntoState(res.data))
  }, (error) => {
    dispatch(setError(error.message))
  })
}

const resetSelectedState = () => {
  return {
    type: RESET_SELECTED_STATE
  }
}

const setIsFetching = (isFetching) => {
  return {
    type: SET_IS_FETCHING, payload: isFetching
  }
}

const setError = (error) => {
  return {
    type: SET_ERROR, payload: error
  }
}

const setQuizIntoState = (data) => {
  return {
    type: SET_QUIZ_INTO_STATE, payload: data
  }
}

export const postAnswer = (data) => dispatch => {
  const answer_id = data.answers.filter((elem) => elem.selectValue === "SELECTED")[0].answer_id
  axios.post(`http://localhost:9000/api/quiz/answer`, {"quiz_id": data.quiz_id, "answer_id": answer_id}).then(res => {
    console.log(res)
    dispatch(setMessage(res.data.message))
    dispatch(resetSelectedState());
    dispatch(fetchQuiz())
  })
}


export const postQuiz = (question, rightAnswer, wrongAnswer, message) => dispatch => {
  axios.post(`http://localhost:9000/api/quiz/new`, {
    "question_text": question, "true_answer_text": rightAnswer,
    "false_answer_text": wrongAnswer
  }).then(res => {
    console.log(res)
    dispatch(setMessage(message))
  }).catch(err => {
    dispatch(setError(err))
  })
  }
