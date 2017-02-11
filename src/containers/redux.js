const ITEM_ON_ENTER = 'ITEM_ON_ENTER'
const ADD_NEPHEWS_TO_LISTS = 'ADD_NEPHEWS_TO_LISTS'
const ADD_LIST = 'ADD_LIST'
const UPDATE_STRUCTURE = 'UPDATE_STRUCTURE'
const ADD_LIST_LISTS_RELATION = 'ADD_LIST_LISTS_RELATION'
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

const addListListsRelation = listId => ({
  type: ADD_LIST_LISTS_RELATION,
  listId
})

export const actionCreators = {
  updateStructure,
  addListListsRelation
}


const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_STRUCTURE:
      const listId = state.relations.itemList[action.exciterItemId]
      const result={
        ...state.items[action.exciterItemId],
        list:{
          ...state.lists[listId],
          exciterItem:null
        }
      }
debugger
      const map = fromJS({
        list:Object.assign({}, state.structure)
      })

      const keyPath = Object.keys(state.relations.listLists).reduce(res => {
        return res+'list exciterItem'
      },'')

      const newMap = map.setIn(keyPath.split(' '), result)


      return {
        ...state,
        structure:newMap.toJS().list
      }

    case ADD_LIST_LISTS_RELATION:
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
