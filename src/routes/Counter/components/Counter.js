import React from 'react'
import { Editor } from 'slate'
import Portal from 'react-portal'

export const Counter = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Counter: {props.counter}</h2>
    <button className="btn btn-default" onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className="btn btn-default" onClick={props.doubleAsync}>
      Double (Async)
    </button>
    <Portal isOpened onOpen={()=>console.log('HELLO')} openByClickOn={<button>Open portal with pseudo modal</button>}>
      <div className="menu hover-menu">
        <h1>HELLO</h1>
      </div>
    </Portal>
  </div>
)

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired,
}

export default Counter
