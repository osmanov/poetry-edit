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

//TODO RENAME initializeState
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
