import test from 'ava'
import {spreadLists} from './utils'

const inputData={
  id:0,
  items:[
    {
      id: 0
    },
    {
      id: 1
    },
    {
      id: 7,
      list:{
        id:2,
        items:[
          {
            id: 6,
            list: {
              id:125,
              items:[
                {
                  id: 16,
                  list: {
                    id:225,
                    items:[
                      {
                        id: 36
                      }
                    ]
                  }
                }

              ]
            }
          },
          {
            id: 8,
            list: {
              id:25,
              items:[
                {
                  id: 46,
                  list: {
                    id:215,
                    items:[
                      {
                        id: 62
                      }
                    ]
                  }
                },
                {
                  id: 146,
                  list: {
                    id:1215,
                    items:[
                      {
                        id: 162
                      }
                    ]
                  }
                }

              ]
            }
          },
        ]
      }
    }
  ]
}

const result=spreadLists(inputData.items,{
  lists:[{
    id:inputData.id
  }],
  itemListRelation:{}
})

test('spreadLists result is consisted from two properties', t => {
  t.is(Object.keys(result).length,2)
})

test('spreadLists returns lists property with right length', t => {
  t.is(result.lists.length,7)
})

test('spreadLists returns itemListRelation property with right value', t => {
  t.deepEqual(result.itemListRelation,{
    7:2,
    6:125,
    16:225,
    8:25,
    46:215,
    146:1215
  })
})

