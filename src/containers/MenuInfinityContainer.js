import React, { PropTypes } from 'react'
import { createStore, applyMiddleware } from 'redux'
import reducer from './redux'

import rootSaga from './sagas'

import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

import MenuInfinity from './MenuInfinity'
import {inity} from './utils'

const logger = createLogger()



export default class MenuInfinityContainer extends React.Component {
  static propTypes = {
    itemOnClick: PropTypes.func,
    initStructureByRule: PropTypes.func,
    structure: PropTypes.object,
    list: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    inity.items = this.props.items
    inity.ruleStructure = this.props.initStructureByRule
    const initialState = inity(this.props.list)

    const middleware = [sagaMiddleware]

    //if (__DEV__) {
      middleware.push(logger)
    //}

    this.store = createStore(
      reducer,
      initialState,
      applyMiddleware(...middleware)
    )

    sagaMiddleware.run(rootSaga)

    //const action = type =>  this.store.dispatch({type})
    //this.store = createStore(reducer, initialState)
  }

  render(){
    const {itemOnClick} = this.props
    return <MenuInfinity itemOnClick={itemOnClick} store={this.store}/>
  }
}
