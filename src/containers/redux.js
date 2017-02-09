const ITEM_ON_ENTER = 'ITEM_ON_ENTER'
const ADD_NEPHEWS_TO_LISTS = 'ADD_NEPHEWS_TO_LISTS'
const ADD_LIST = 'ADD_LIST'

const addNephewsToLists = (childListId) => ({
  type: ADD_NEPHEWS_TO_LISTS,
  childListId
})

const addList = list => ({
  type: ADD_LIST,
  list
})

export const actionCreators = {
  addNephewsToLists,
  addList
}


const reducer = (state, action) => {
  switch (action.type) {
    case ADD_NEPHEWS_TO_LISTS:
      let listsNephews={}
      Object.keys(state.listsNephews).forEach(parentId=>{
        listsNephews[parentId]=state.listsNephews[parentId].slice()
        listsNephews[parentId].push(action.childListId)
      })
      listsNephews[action.childListId]=[]

      return {
        ...state,
        listsNephews
      }
    case ADD_LIST:
      let lists=state.lists.slice()
      lists.push(action.list)

      return {
        ...state,
        lists
      }
    default:
      return state;
  }
}

export default reducer
