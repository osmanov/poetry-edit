import { delay } from 'redux-saga'
import { put, takeEvery, take, call, fork, select  } from 'redux-saga/effects'
import * as actions from './redux'

// Our worker Saga: will perform the async increment task
export function* itemClick(action) {
  yield put(actions.actionCreators.updateStructure(action.itemId))
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  // while(true) {
  //   yield take(actions.ITEM_CLICK)
  //  yield takeEvery(actions.ITEM_CLICK, itemClick)

  // }
}

export default function* rootSaga() {
  yield [
    watchIncrementAsync()
  ]
}
