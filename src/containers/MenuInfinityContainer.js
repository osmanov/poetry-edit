import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import reducer from './redux'

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import MenuInfinity from './MenuInfinity'

const items={
  0:{
    id:0,
    label:<i className="fa fa-bold" aria-hidden="true"></i>,
    className:'item',
    mark:'bold'
  },
  1: {
    id:1,
    label:<i className="fa fa-italic" aria-hidden="true"></i>,
    className:'item',
    mark:'italic'
  },
  2:{
    id:2,
    label:<i className="fa fa-bookmark-o" aria-hidden="true"></i>,
    className:'item',
  },
  3:{
    id:3,
    label:<i className="fa fa-comment-o" aria-hidden="true"></i>,
    className:'item',
  },
  4:{
    id:4,
    label:<i className="fa fa-ellipsis-h" aria-hidden="true"></i>,
    className:'item',
  },
  5:{
    id:5,
    label:<i className="fa fa-align-right" aria-hidden="true"></i>,
    className:'item1',
    mark:'alignRight'
  },
  6:{
    id:6,
    label:<i className="fa fa-align-center" aria-hidden="true"></i>,
    className:'item1',
    mark:'alignCenter'
  },
  7:{
    id:7,
    label:<i className="fa fa-align-left" aria-hidden="true"></i>,
    className:'item',
    mark:'alignLeft'
  }
}


const list ={
  id:0,
  className:'menuContainer',
  volume:'up',
  axis:'x',
  items: [
    {
      id: 0
    },
    {
      id: 1
    },
    {
      id: 7,
      list: {
        id:2,
        className:'menuContainer2',
        volume:'down',
        axis:'y',
        items:[
          {
            id: 6
          },
          {
            id: 5,
            list: {
              className:'menuContainer2',
              volume:'up',
              axis:'x',
              items:[
                {
                  id: 0
                },
                {
                  id: 1
                }
              ]
            }
          }
        ]
      }
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    }
  ]
}
const logger = createLogger()

export default class MenuInfinityContainer extends React.Component {
  constructor(props) {
    super(props)

    const lists=[
      {
        id:list.id,
        className:list.className,
        volume:list.volume,
        axis:list.axis,
        items:list.items
      }
    ]

    let listsNephews={}
    listsNephews[list.id]=[]
    
    const initialState = {
      items,
      lists,
      listsNephews
    }


    const middleware = [thunk]

    //if (__DEV__) {
      middleware.push(logger)
    //}

    this.store = createStore(
      reducer,
      initialState,
      applyMiddleware(...middleware)
    )

    //this.store = createStore(reducer, initialState)
  }

  render(){
    return <MenuInfinity store={this.store}/>
  }
}
