import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import reducer from './redux'

import rootSaga from './sagas'

import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

import MenuInfinity from './MenuInfinity'
import {spreadLists} from './utils'
export const items={
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
  id:'L0',
  className:'menuContainer',
  volume:'up',
  axis:'x',
  items: [
    {
      id: 0,
      onClick:(e,item)=>{
        console.log(e)
        console.log(item)
        debugger
      }
    },
    {
      id: 1
    },
    {
      id: 2,
      onClick:(e,item)=>{
        console.log(item)
        debugger
      },
      list: {
        id:'L1',
        className:'menuContainer2',
        volume:'down',
        axis:'y',
        items:[
          {
            id: 3
          },
          {
            id: 4,
            list: {
              id:'L2',
              className:'menuContainer2',
              volume:'up',
              axis:'x',
              items:[
                {
                  id: 5,
                  list: {
                    id:'L3',
                    className:'menuContainer2',
                    volume:'down',
                    axis:'y',
                    items:[
                      {
                        id: 6,
                        onClick:(e,item,list)=>{
                          console.log(item)
                          console.log(list)
                          debugger
                        },
                        onSubmit:(e,item)=>{
                          console.log(e)
                          console.log(item)
                        }
                      }
                    ]
                  }
                },
                {
                  id: 7
                }
              ]
            }
          }
        ]
      }
    }
  ]
}
const logger = createLogger()



const initStructure = {
  id: list.id,
  className: list.className,
  volume: list.volume,
  axis: list.axis,
  itemIdsOrder: list.items.map(item=>item.id),
  items: list.items.map(item=>{
    let result={...items[item.id],events:null}
    Object.keys(item).forEach(key=>{
      if(typeof item[key] === "function"){
        if(result.events===null){
          result.events={}
        }
        result.events[key]=item[key]
      }
    })

    return result
  })
}

const listsMount = spreadLists(list.items, {
  lists: [{...initStructure}],
  itemListRelation: {}
})

export default class MenuInfinityContainer extends React.Component {
  constructor(props) {
    super(props)

    let listListRelation={}
    listListRelation[list.id]=[]

    const lists={} //todo move to utils
    Object.keys(listsMount.lists).forEach(index=>{
      const list = listsMount.lists[index]
      lists[list.id]=Object.assign({},list)
    })

    const initialState = {
      items, // const
      lists, // const
      relations: {
        itemList: listsMount.itemListRelation, //const
        listLists: listListRelation // dynamic
      },
      structure: {
        ...initStructure,
        exciterItem:null
      } // dynamic
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
    return <MenuInfinity store={this.store}/>
  }
}
