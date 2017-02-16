const ITEM_ON_ENTER = 'ITEM_ON_ENTER'
const ADD_NEPHEWS_TO_LISTS = 'ADD_NEPHEWS_TO_LISTS'
const ADD_LIST = 'ADD_LIST'
const UPDATE_STRUCTURE = 'UPDATE_STRUCTURE'
const ADD_LIST_LISTS_RELATION = 'ADD_LIST_LISTS_RELATION'
const REMOVE_LIST_LISTS_RELATION = 'REMOVE_LIST_LISTS_RELATION'
const CLEAR_STRUCTURE = 'CLEAR_STRUCTURE'
const ITEM_CLICK = 'ITEM_CLICK'

import {fromJS} from 'immutable'

const addNephewsToLists = (childListId) => ({
  type: ADD_NEPHEWS_TO_LISTS,
  childListId
})

const addList = list => ({
  type: ADD_LIST,
  list
})

const updateStructure = exciterItemId => ({
  type: UPDATE_STRUCTURE,
  exciterItemId
})

const clearStructure = () => ({
  type: CLEAR_STRUCTURE
})

const addListListsRelation = listId => ({
  type: ADD_LIST_LISTS_RELATION,
  listId
})

const removeListListsRelation = listId => ({
  type: REMOVE_LIST_LISTS_RELATION,
  listId
})

const itemClick = (event,itemId,listId) => ({
  type: ITEM_CLICK,
  itemId,
  listId,
  event
})



export const actionCreators = {
  updateStructure,
  addListListsRelation,
  removeListListsRelation,
  clearStructure,
  itemClick
}


const reducer = (state, action) => {
  switch (action.type) {
    case ITEM_CLICK:
    //TODO from here  
    // const itemIndex=state.lists[action.listId].itemIdsOrder.indexOf(action.itemId)
      // const clickedItem=state.lists[action.listId].items[itemIndex]

    case REMOVE_LIST_LISTS_RELATION:
      const rootListId=state.structure.id
      let rootRelation=state.relations.listLists[rootListId]

      let rootRelationResult = rootRelation.slice(0,rootRelation.indexOf(action.listId)+1)

      let listsListRelation={}
      listsListRelation[rootListId]=rootRelationResult

      rootRelationResult.forEach((listId,index)=>{
        listsListRelation[listId]=rootRelationResult.slice(index+1)
      })

      return {
        ...state,
        relations:Object.assign({},state.relations,{listLists:listsListRelation})
      }

    case CLEAR_STRUCTURE:
      return {
        ...state,
        structure:{...state.structure, exciterItem:null}
      }

    case UPDATE_STRUCTURE:
      // if(action.exciterItemId==4){
      // //  debugger
      // }
      // debugger
      const listId = state.relations.itemList[action.exciterItemId]
      const result={ //todo rename exciterItem
        ...state.items[action.exciterItemId],
        list:{
          ...state.lists[listId],
          exciterItem:null
        }
      }
 // debugger
      const map = fromJS({
        list:Object.assign({}, state.structure)
      })

      const keyPath = Object.keys(state.relations.listLists).reduce(res => {
        return res+'list exciterItem '
      },'')

      const newMap = map.setIn(keyPath.trim().split(' '), result)


      return {
        ...state,
        structure:newMap.toJS().list
      }

    case ADD_LIST_LISTS_RELATION:
     // debugger

      let listLists={}
      Object.keys(state.relations.listLists).forEach(parentListId=>{
        listLists[parentListId]=state.relations.listLists[parentListId].slice()
        listLists[parentListId].push(action.listId)
      })
      listLists[action.listId]=[]
      const relations=Object.assign({},state.relations,{listLists})

      return {
        ...state,
        relations
      }
    /*case ADD_LIST:
      let lists=state.lists.slice()
      lists.push(action.list)

      return {
        ...state,
        lists
      }*/
    default:
      return state;
  }
}

export default reducer
