let items=null
import {fromJS} from 'immutable'


function floatUntilRootList(list,res){
  let clone=[...res]
  if(list.parentListId!==null){
    clone=floatUntilRootList(floatUntilRootList.lists[list.parentListId],[list.parentListId,...res])
  }else{
    let result = {[list.id]: clone}
    clone.forEach((listId, index)=> {
      result[listId] = clone.slice(index + 1)
    })
   return {listList:result,orderLists:[...clone]}
  }
  return clone
}

export function inity(currentListSection, result = null){
  const blankList = itemsListMixin(currentListSection, inity.items)

  if (result === null) {
    result = {
      lists: {[blankList.id]: {...blankList, parentListId: null}},
      relations: {
        itemList: {},
        listItem: {},
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
      const keys = Object.keys(item.list)
      for (let i = 0; i < keys.length; i++) { //list stuff
        const key = keys[i]
        if (key === 'items') {

          const lists = {lists: {[item.list.id]: {...itemsListMixin(item.list, inity.items),parentListId:blankList.id}, ...result.lists}}

          const relationsItemList={itemList: {[item.id]: item.list.id, ...result.relations.itemList}}
          const relationsListItem={listItem: {[item.list.id]: item.id, ...result.relations.listItem}}
          let relationsListLists={listLists:{...result.relations.listLists}}

          let structure = {structure: Object.assign({}, result.structure)}

          if(typeof inity.ruleStructure === "function"){
            for (let k = 0,listsItems=lists.lists[item.list.id].items; k < listsItems.length; k++) {
              if (inity.ruleStructure({...listsItems[k],...inity.items[listsItems[k].id]})) {// TODO if key `list` exists  remove it from argument

                floatUntilRootList.lists = {...lists.lists}
                const {listList,orderLists}=floatUntilRootList(lists.lists[item.list.id], [item.list.id])

                relationsListLists.listLists = listList


                const itList=orderLists.slice(1)

                let keyPath='list exciterItem '

                for(let it=0;it<itList.length;it++){
                  const listId=itList[it]
                  const itemIdByListId = relationsListItem.listItem[listId]


                  //todo if(!inity.items[itemIdByListId]) exception

                  const exciter={
                    ...inity.items[itemIdByListId],
                    list:{
                      ...lists.lists[listId],
                      exciterItem:null
                    }
                  }


                  const newMap=fromJS({
                    list:structure.structure
                  }).setIn(keyPath.trim().split(' '), exciter)
                  keyPath+='list exciterItem '
                  structure.structure=newMap.toJS().list
                }

// console.log(structure.structure)
// console.log(structure.structure)
               // console.log(structure.structure.exciterItem.list.exciterItem.list.exciterItem)

                //console.log(map.toJS().list)
                break
              }
            }

          }
          const relations = {relations: {...relationsItemList,...relationsListLists,...relationsListItem}}



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
