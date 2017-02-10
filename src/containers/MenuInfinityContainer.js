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
              id:3,
              className:'menuContainer2',
              volume:'up',
              axis:'x',
              items:[
                {
                  id: 4,
                  list: {
                    id:20,
                    className:'menuContainer2',
                    volume:'up',
                    axis:'y'
                  }
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
    }
  ]
}
const logger = createLogger()

//TODO move to utils TODO TEST
function spreadLists(nephews,result){
  const {itemListRelation, lists}=result

  for(let j = 0; j < nephews.length; j++){
    const item=nephews[j]

    if (item.list) {

      const cloneRelation = Object.assign({}, itemListRelation)
      cloneRelation[item.id] = item.list.id

      let list = {}
      const keys = Object.keys(item.list)

      for (let i = 0; i <= keys.length; i++) {
        const key = keys[i]

        if (key === 'items') {
          let clone = lists.slice()
          clone.push(list)

          return spreadLists(item.list[key], {itemListRelation:cloneRelation, lists:clone})
        }
        list[key] = item.list[key]
      }

    }
  }
  return result
}

export default class MenuInfinityContainer extends React.Component {
  constructor(props) {
    super(props)



    const lists=spreadLists(list.items,{lists:[{
      id:list.id,
      className:list.className,
      volume:list.volume,
      axis:list.axis
    }],itemListRelation:{}})

console.log(lists)

    /*const lists=[
      {
        id:list.id,
        className:list.className,
        volume:list.volume,
        axis:list.axis
      },
    ]*/

    let listsNephews={}
    listsNephews[list.id]=[]

    const initialState = {
      items,
      lists:[],
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
