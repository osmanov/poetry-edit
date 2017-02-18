import React, { PropTypes } from 'react'
import { createStore, applyMiddleware } from 'redux'
import reducer from './redux'

import rootSaga from './sagas'

import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

import MenuInfinity from './MenuInfinity'
import {spreadLists} from './utils'

const logger = createLogger()

export default class MenuInfinityContainer extends React.Component {
  static propTypes = {
    itemOnClick: PropTypes.func,
    structure: PropTypes.object,
    list: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    const initStructure = {
      id: this.props.list.id,
      className: this.props.list.className,
      volume: this.props.list.volume,
      axis: this.props.list.axis,
      itemIdsOrder: this.props.list.items.map(item=>item.id),
      items: this.props.list.items.map(item=>({...item,...this.props.items[item.id]}))
    }

    const listsMount = spreadLists(this.props.list.items, {
      lists: [{...initStructure}],
      itemListRelation: {}
    },this.props.items)

    //TODO set if this.props.structure
    let listListRelation={}
    listListRelation[this.props.list.id]=[]

    const lists={} //todo move to utils
    Object.keys(listsMount.lists).forEach(index=>{
      const list = listsMount.lists[index]
      lists[list.id]=Object.assign({},list)
    })

    const structure = this.props.structure || {
        ...initStructure,
        exciterItem: null
      }

    const initialState = {
      items:this.props.items, // const
      lists, // const
      relations: {
        itemList: listsMount.itemListRelation, //const
        listLists: listListRelation // dynamic
      },
      structure
    }

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
