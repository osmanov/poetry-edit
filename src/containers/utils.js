let items=null
import {fromJS} from 'immutable'

export function inity(currentListSection, result = null){
  const blankList = itemsListMixin(currentListSection, inity.items)

  if (result === null) {
    result = {
      lists: {[blankList.id]: {...blankList}},
      relations: {
        itemList: {},
        listLists: {[blankList.id]:[]}
      },
      structure: {
        ...blankList,
        exciterItem: null
      }
    }
  }

  for (let j = 0; j < currentListSection.items.length; j++) { //items
    const item = currentListSection.items[j]
    if (item.list) {
      console.log(Object.keys(result.lists).length)
      const keys = Object.keys(item.list)
      for (let i = 0; i < keys.length; i++) { //list stuff
        const key = keys[i]
        if (key === 'items') {

          const lists = {lists: {[item.list.id]: itemsListMixin(item.list, inity.items), ...result.lists}}
          const relationsItemList={itemList: {[item.id]: item.list.id, ...result.relations.itemList}}
          let relationsListLists={listLists:{...result.relations.listLists}}

          //const relations = {relations: Object.assign({},result.relations,{itemList: {[item.id]: item.list.id, ...result.relations.itemList}})}

          let structure = {structure: Object.assign({}, result.structure)}

          if(typeof inity.ruleStructure === "function"){
            for (let k = 0,listsItems=lists.lists[item.list.id].items; k < listsItems.length; k++) {
              if (inity.ruleStructure({...listsItems[k],...inity.items[listsItems[k].id]})) {// TODO if key `list` exists  remove it from argument

                const exciter={
                  ...inity.items[item.id],
                  list:{
                    ...lists.lists[item.list.id],
                    exciterItem:null
                  }
                }

                const map = fromJS({
                  list:structure
                })
                console.log('--->'+Object.keys(lists.lists).length)
                const keyPath = Object.keys(result.relations.listLists).reduce(res => {
                  return res+'list exciterItem '
                },'')

                const newMap = map.setIn(keyPath.trim().split(' '), exciter)
                structure=newMap.toJS().list

                /*****************/
                let listLists={}
                for (let z = 0; z < Object.keys(lists.lists).length; z++) {//todo object.keys length
//TODo define all prev lists for listLists
                }
                Object.keys(relationsListLists.listLists).forEach(parentListId=>{
                  listLists[parentListId]=relationsListLists.listLists[parentListId].slice()
                  listLists[parentListId].push(item.list.id)
                })
                /***************/

                /*let listLists={}
                Object.keys(relationsListLists.listLists).forEach(parentListId=>{
                  listLists[parentListId]=relationsListLists.listLists[parentListId].slice()
                  listLists[parentListId].push(item.list.id)
                })
                listLists[item.list.id]=[]
                relationsListLists.listLists=listLists*/

               // relations={...relations.relations}

                break
              }
            }

          }
          const relations = {relations: {...relationsItemList,...relationsListLists}}



          result = inity(item.list, {...lists,...relations,...structure})
        }
      }
    }
  }
  result.items=Object.assign({}, inity.items)
  return result
}

function itemsListMixin(list, itemsCollection) {
  return {
    id: list.id,
    className: list.className,
    volume: list.volume,
    axis: list.axis,
    itemIdsOrder: list.items.map(item=>item.id),
    items: list.items.map(item=>({...item, ...itemsCollection[item.id]}))
  }
}

function shapeListBlank(list, itemsCollection) {
  return {
    id: list.id,
    className: list.className,
    volume: list.volume,
    axis: list.axis,
    itemIdsOrder: list.items.map(item=>item.id),
    items: list.items.map(item=>({...item, ...itemsCollection[item.id]}))
  }
}

export function spreadLists(nephews, result, itemCollection = null) {
  if (items === null)items = itemCollection
  let clone = {
    lists: result.lists.slice(),
    itemListRelation: Object.assign({}, result.itemListRelation)
  }

  for (let j = 0; j < nephews.length; j++) {
    const item = nephews[j]

    if (item.list) {

      let list = {}
      const keys = Object.keys(item.list)

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (key === 'items') {
          list.itemIdsOrder = item.list[key].map(item=>item.id)
          list.items = item.list[key].map(item=>({...item,...items[item.id]}))

          const cloneRelation = Object.assign({}, clone.itemListRelation)
          cloneRelation[item.id] = item.list.id

          clone = spreadLists(item.list[key], {lists: [...clone.lists, list], itemListRelation: cloneRelation})
        } else {
          list[key] = item.list[key]
        }
      }

    }
  }
  return clone
}



export function initializeState(currentListSection, result = null) {
  if (result === null) {
    result = {
      lists: [],
      items: Object.assign({}, initializeState.items),
      relations: {
        itemList: {},
        listLists: {[currentListSection.id]: []}
      },
      structure: {
        ...shapeListBlank(currentListSection, initializeState.items),
        exciterItem: null
      }
    }
  }

  let clone = {
    lists: result.lists.slice(),
    structure: Object.assign({}, result.structure),
    relations: Object.assign({}, result.relations)
  }

  for (let j = 0, itemsGroup = currentListSection.items; j < itemsGroup.length; j++) {
    const item = itemsGroup[j]

    if (item.list) {

      let list = {}
      const keys = Object.keys(item.list)

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (key === 'items') {
          console.log()
          list.itemIdsOrder = item.list.items.map(item=>item.id)
          list.items = item.list.items.map(item=>({...item,...initializeState.items[item.id]}))
          clone.relations.itemList[item.id] = item.list.id
          // listLists,exciterItemId
         /* const helper = new StructureMapHelper({
            structure: clone.structure,
            listLists: clone.relations.listLists,
            exciterItemId: item.id
          })*/

          if(typeof initializeState.ruleStructure === "function"){

            const {list,...other}={...item,...initializeState.items[item.id]}
            if(initializeState.ruleStructure(other)){
             // debugger
              clone.relations.listLists = shapeListListsRelation(clone.relations.listLists, item.list.id)
            }


            //debugger
            /*const itemIndexOrder=clone.structure.itemIdsOrder.indexOf(item.id)
            const {list,...other}=clone.structure.items[itemIndexOrder]
            if(initializeState.ruleStructure(other)){

            }*/
          }

          clone = initializeState(item.list, {
            lists: [...clone.lists, list],
            relations: clone.relations,
            structure: clone.structure
          })
        } else {
          list[key] = item.list[key]
        }
      }

    }
  }
  return clone
}

function shapeListListsRelation(listLists,listId){
  let result = {[listId]: []}
  Object.keys(listLists).forEach(parentListId=>{
    result[parentListId]=listLists[parentListId].slice()
    result[parentListId].push(listId)
  })
  return result
}

class StructureMapHelper{
  constructor({structure,listLists,exciterItemId}){
    this._setStructure(structure)
    this._setKeyPath(listLists)
  }

  _setKeyPath(listLists) {
    this._keyPath = Object.keys(listLists).reduce(res => {
      return res + 'list exciterItem '
    }, '').trim().split(' ')
  }

  _setStructure(structure) {
    this._structure = fromJS({
      list: structure
    })
  }

  _getStructure() {
    return this._structure
  }

  _getPreparingItemKeyPath() {
    return this._keyPath
  }

  _getHotListKeyPath() {
    return this._keyPath.slice(0, this._keyPath.length - 1)
  }

  getHotList(){

  }

  setPreparingItem(){

  }

}
/*
* let items=null
 let rule=null

 export function spreadLists(nephews, result, itemCollection = null, structureRule=null) {
 if (items === null)items = itemCollection
 if (rule === null)rule = structureRule
 let clone = {
 lists: result.lists.slice(),
 structure: Object.assign({}, result.structure),
 relations:Object.assign({}, result.relations)
 }

 for (let j = 0; j < nephews.length; j++) {
 const item = nephews[j]

 if (item.list) {

 let list = {}
 const keys = Object.keys(item.list)

 for (let i = 0; i < keys.length; i++) {
 const key = keys[i]
 if (key === 'items') {
 list.itemIdsOrder = item.list[key].map(item=>item.id)
 list.items = item.list[key].map(item=>({...item,...items[item.id]}))


 clone.relations.itemList[item.id] = item.list.id
 // debugger
 if(typeof rule === "function"){//TODO add list
 //console.log(clone.structure.itemIdsOrder.indexOf(item.id))
 // console.log(item.id)
 // console.log(clone.structure.itemIdsOrder)
 // console.log(clone.structure.itemIdsOrder.indexOf(item.id))
 // console.log(clone.structure.itemIdsOrder.indexOf(item.id))
 //debugger
 const itemIndexOrder=clone.structure.itemIdsOrder.indexOf(item.id)
 const {list,...other}=clone.structure.items[itemIndexOrder]
 if(rule(other)){

 }
 // debugger
 }

clone = spreadLists(item.list[key], {lists: [...clone.lists, list], relations:clone.relations,structure:clone.structure})
} else {
  list[key] = item.list[key]
}
}

}
}
return clone
}

* */
