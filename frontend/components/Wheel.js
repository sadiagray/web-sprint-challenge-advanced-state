import React from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

const Wheel = props => {
  return (
    <div id="wrapper">
      <div id="wheel">
        {props.wheelState.map((wheel) => {
          return (
            <div className={wheel.cogState} style={{ "--i": wheel.wheelIndex}} key={wheel.wheelIndex}>
              {wheel.wheelValue}
            </div>
          );
        })}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => props.moveCounterClockwise()}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => props.moveClockwise()}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wheelState: state.wheel.wheelState
  }
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);