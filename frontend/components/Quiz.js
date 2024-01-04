import React from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer} from '../state/action-creators'

function Quiz(props) {
  if (!props.isFetching) {
    props.fetchQuiz();
  }
  return (
    <div id="wrapper">
      {
        props.isFetching ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              {props.quiz.answers.map((answer, ind) => {
                return <div key={answer.text} className={props.quiz.answers[ind].answerHighlight ? "answer selected" : "answer"}>
                  {answer.text}
                    <button onClick={() => props.selectAnswer(answer.answer_id)}>{props.quiz.answers[ind].selectValue}</button>
                </div>
              })}
            </div>

            <button id="submitAnswerBtn" disabled={props.buttonState} onClick={() => props.postAnswer(props.quiz)}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quiz: state.quiz.quiz,
    isFetching: state.quiz.isFetching,
    error: state.quiz.error,
    buttonState: state.quiz.buttonState
  }
}

export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz);