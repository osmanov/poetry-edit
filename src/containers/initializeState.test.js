import test from 'ava'
import {initialize, matchItemsByListLevel,spotRootSection} from './initializeState'
import {inputData, items} from './mock';
import React from 'react'

function macro() {
  initialize.items = items
  initialize.schema = inputData
}

test('match items with root level list', t => {
  macro();
  t.deepEqual(matchItemsByListLevel(inputData), {
    id: 0,
    className: 'menuContainer',
    volume: 'up',
    axis: 'x',
    itemIdsOrder: [0, 1, 7],
    items: [
      {
        ...items[0],
        ...inputData.items[0]
      },
      {
        ...items[1]
      },
      {
        ...items[7],
        ...inputData.items[2]
      },
    ],
  })
})

test('define root section by schema', t => {
  macro();
  t.snapshot(spotRootSection(inputData))
})
