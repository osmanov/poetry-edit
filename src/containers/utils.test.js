import test from 'ava'
import {spreadLists,inity} from './utils'
import React from 'react'
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
  },
  8:{
    id:8,
    label: <span>RENAT</span>,
    className:'item',
  }
}

const inputData={
  id:0,
  className:'menuContainer',
  volume:'up',
  axis:'x',
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
        className:'menuContainer2',
        volume:'up',
        axis:'x',
        items:[
          {
            id: 6,
            list: {
              id:125,
              className:'menuContainer2',
              volume:'up',
              axis:'y',
              items:[
                {
                  id: 16,
                  list: {
                    id:225,
                    className:'menuContainer2',
                    volume:'up',
                    axis:'y',
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
              className:'menuContainer2',
              volume:'up',
              axis:'x',
              items:[
                {
                  id: 46,
                  list: {
                    id:215,
                    className:'menuContainer2',
                    volume:'up',
                    axis:'x',
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
                    className:'menuContainer2',
                    volume:'up',
                    axis:'y',
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
},items)

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

inity.items=items
inity.ruleStructure = item => item.id == 36

const resultInity=inity(inputData)

test('inity result relation.itemList', t => {
  t.deepEqual(resultInity.relations.itemList,{
    7:2,
    6:125,
    16:225,
    8:25,
    46:215,
    146:1215
  })
})

test('inity result relation.listLists with initStructureByRule', t => {
  t.deepEqual(resultInity.relations.listLists,{
    0:[2,125,225],
    2:[125,225],
    125:[225],
    225:[]
  })
})

/*
test('inity result relation.listLists', t => {
  t.deepEqual(resultInity.relations.listLists,{
    0:[]
  })
})*/

test('inity result items', t => {
  t.deepEqual(resultInity.items,items)
})

function helper(sliceItems){
  return sliceItems.map(item=>{
    return {...item,...items[item.id]}//todo filter list
  })
}

test('inity result lists', t => {
  t.is(Object.keys(resultInity.lists).length,7)

  t.deepEqual(resultInity.lists[0],{
    className:'menuContainer',
    volume:'up',
    axis:'x',
    id:0,
    itemIdsOrder:[0,1,7],
    items:helper(inputData.items)
  })

  t.deepEqual(resultInity.lists[2],{
    id:2,
    className:'menuContainer2',
    volume:'up',
    axis:'x',
    itemIdsOrder:[6,8],
    items:helper(inputData.items[2].list.items)
  })

  t.deepEqual(resultInity.lists[125],{
    id:125,
    className:'menuContainer2',
    volume:'up',
    axis:'y',
    itemIdsOrder:[16],
    items:helper(inputData.items[2].list.items[0].list.items)
  })

  t.deepEqual(resultInity.lists[225],{
    id:225,
    className:'menuContainer2',
    volume:'up',
    axis:'y',
    itemIdsOrder:[36],
    items:helper(inputData.items[2].list.items[0].list.items[0].list.items)
  })

  t.deepEqual(resultInity.lists[25],{
    id:25,
    className:'menuContainer2',
    volume:'up',
    axis:'x',
    itemIdsOrder:[46,146],
    items:helper(inputData.items[2].list.items[1].list.items)
  })

  t.deepEqual(resultInity.lists[215],{
    id:215,
    className:'menuContainer2',
    volume:'up',
    axis:'x',
    itemIdsOrder:[62],
    items:helper(inputData.items[2].list.items[1].list.items[0].list.items)
  })

  t.deepEqual(resultInity.lists[1215],{
    id:1215,
    className:'menuContainer2',
    volume:'up',
    axis:'y',
    itemIdsOrder:[162],
    items:helper(inputData.items[2].list.items[1].list.items[1].list.items)
  })
})

test('inity result structure without initStructureByRule', t => {
  t.deepEqual(resultInity.structure,{
    exciterItem: null,
    id: inputData.id,
    className: inputData.className,
    volume: inputData.volume,
    axis: inputData.axis,
    itemIdsOrder: inputData.items.map(item=>item.id),
    items: inputData.items.map(item=>({...item, ...items[item.id]}))
  })
})



