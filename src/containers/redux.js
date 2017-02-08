const TEST_CLICK = 'TEST_CLICK'
const ITEM_ON_ENTER = 'ITEM_ON_ENTER'

const testClick = () => ({
  type: TEST_CLICK
})

const itemOnEnter = (item) => ({
  type: ITEM_ON_ENTER,
  itemOnEnter:item
})

export const actionCreators = {
  testClick,
  itemOnEnter
}


const reducer = (state, action) => {
  switch (action.type) {
    case TEST_CLICK:
      return {
        ...state,
        isTestClicked: true,
      }
    case ITEM_ON_ENTER:
      return {
        ...state,
        itemOnEnter: action.itemOnEnter,
      }

    default:
      return state;
  }
}

export default reducer
