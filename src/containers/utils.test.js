import test from 'ava'
import {inity} from './utils'
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
  },
  146:{
    id:146,
    label: <span>OSMANOV</span>,
    className:'item',
  },
  16:{
    id:16,
    label: <span>CHINO</span>,
    className:'item',
  },
  36:{
    id:36,
    label: <span>MORENO</span>,
    className:'item',
  },
  46:{
    id:46,
    label: <span>ABE</span>,
    className:'item',
  },
  62:{
    id:62,
    label: <span>STEFAN</span>,
    className:'item',
  },
  162:{
    id:162,
    label: <span>DAN</span>,
    className:'item',
  },
  8080:{
    id:8080,
    label: <span>google</span>,
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
      id: 0,
      list:{
        id:'l59',
        className:'menuContainer2',
        volume:'up',
        axis:'y',
        items:[
          {
            id:8080
          }
        ]
      }
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

function macro(ruleStructure){
  inity.items=items
  inity.ruleStructure = ruleStructure
  return inity(inputData)
}

function helper(sliceItems){
  return sliceItems.map(item=>{
    return {...item,...items[item.id]}//todo filter list
  })
}


test('inity result relation.itemList', t => {
  const {relations:{itemList}}=macro()
  t.deepEqual(itemList,{
    0:'l59',
    7:2,
    6:125,
    16:225,
    8:25,
    46:215,
    146:1215
  })
})

test('inity result relation.listItem', t => {
  const {relations:{listItem}}=macro()
  t.deepEqual(listItem,{
    'l59':0,
    2:7,
    125:6,
    225:16,
    25:8,
    215:46,
    1215:146
  })
})

test('inity result relation.listLists with initStructureByRule', t => {
  const {relations:{listLists}}=macro(item => item.id == 162)
  t.deepEqual(listLists,{
    0:[2,25,1215],
    2:[25,1215],
    25:[1215],
    1215:[]
  })
})

test('inity result relation.listLists with multi initStructureByRule', t => {
  const {relations:{listLists}}=macro(item => (item.id == 162 || item.id == 36))
  t.deepEqual(listLists,{
    0:[2,125,225],
    2:[125,225],
    125:[225],
    225:[]
  })
})


test('inity result relation.listLists', t => {
  const {relations:{listLists}}=macro()
  t.deepEqual(listLists,{
    0:[]
  })
})

test('inity result items', t => {
  t.deepEqual(macro().items,items)
})



test('inity result lists', t => {
  const {lists}=macro()
  t.is(Object.keys(lists).length,8)

  t.deepEqual(lists[0],{
    className:'menuContainer',
    volume:'up',
    axis:'x',
    id:0,
    itemIdsOrder:[0,1,7],
    items:helper(inputData.items),
    parentListId:null
  })

  t.deepEqual(lists[2],{
    id:2,
    className:'menuContainer2',
    volume:'up',
    axis:'x',
    itemIdsOrder:[6,8],
    items:helper(inputData.items[2].list.items),
    parentListId:0
  })

  t.deepEqual(lists[125],{
    id:125,
    className:'menuContainer2',
    volume:'up',
    axis:'y',
    itemIdsOrder:[16],
    items:helper(inputData.items[2].list.items[0].list.items),
    parentListId:2
  })

  t.deepEqual(lists[225],{
    id:225,
    className:'menuContainer2',
    volume:'up',
    axis:'y',
    itemIdsOrder:[36],
    items:helper(inputData.items[2].list.items[0].list.items[0].list.items),
    parentListId:125
  })

  t.deepEqual(lists[25],{
    id:25,
    className:'menuContainer2',
    volume:'up',
    axis:'x',
    itemIdsOrder:[46,146],
    items:helper(inputData.items[2].list.items[1].list.items),
    parentListId:2
  })

  t.deepEqual(lists[215],{
    id:215,
    className:'menuContainer2',
    volume:'up',
    axis:'x',
    itemIdsOrder:[62],
    items:helper(inputData.items[2].list.items[1].list.items[0].list.items),
    parentListId:25
  })

  t.deepEqual(lists[1215],{
    id:1215,
    className:'menuContainer2',
    volume:'up',
    axis:'y',
    itemIdsOrder:[162],
    items:helper(inputData.items[2].list.items[1].list.items[1].list.items),
    parentListId:25
  })
})

test('inity result structure with initStructureByRule', t => {
  const {structure}=macro(item => item.id == 162)
  t.is(structure.id,inputData.id)
  t.is(structure.exciterItem.id,inputData.items[2].id)
  t.is(structure.exciterItem.list.id,inputData.items[2].list.id)
  t.is(structure.exciterItem.list.exciterItem.id,inputData.items[2].list.items[1].id)
  t.is(structure.exciterItem.list.exciterItem.list.id,inputData.items[2].list.items[1].list.id)
  t.is(structure.exciterItem.list.exciterItem.list.exciterItem.id,inputData.items[2].list.items[1].list.items[1].id)
  t.is(structure.exciterItem.list.exciterItem.list.exciterItem.list.id,inputData.items[2].list.items[1].list.items[1].list.id)
  t.is(structure.exciterItem.list.exciterItem.list.exciterItem.list.exciterItem,null)
})

function checkListItemsClassNames(list){
  const rule=item=>{
    return item.id === 162 ? item.className === 'item item-active' : (item.className === 'item' || item.className === 'item1')
  }

  for(let i=0;i<list.items.length;i++){
    if(!rule(list.items[i]))return false
  }
  return true
}

test('inity result structure active className with initStructureByRule', t => {
  let {structure}=macro(item => item.id === 162)
  while(structure.exciterItem){
    t.truthy(checkListItemsClassNames(structure))
    structure=structure.exciterItem.list
    if(structure.exciterItem===null){
      t.truthy(checkListItemsClassNames(structure))
    }
  }
})

test('inity result lists active className with initStructureByRule', t => {
  let {lists}=macro(item => item.id === 162)
  Object.keys(lists).forEach(listId=>{
    t.truthy(checkListItemsClassNames(lists[listId]))
  })
})

test('inity result structure', t => {
  const {structure}=macro()
  t.deepEqual(structure,{
    exciterItem: null,
    id: inputData.id,
    className: inputData.className,
    volume: inputData.volume,
    axis: inputData.axis,
    itemIdsOrder: inputData.items.map(item=>item.id),
    items: inputData.items.map(item=>({...item, ...items[item.id]}))
  })
})





/*
0:[2]
2:[125,25]
125:[225]
25:[215,1215]
*/

/*
 0:[2,125,225],
 2:[125,225],
 125:[225],
 225:[]
*/

/*
 0:[2,25,1215],
 2:[25,1215],
 25:[1215],
 1215:[]
*/
