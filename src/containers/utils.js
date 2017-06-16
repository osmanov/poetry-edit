let items = null
import { fromJS } from 'immutable'


function floatUntilRootList(list, res) {
  let clone = [...res]
  if (list.parentListId !== null) {
    clone = floatUntilRootList(floatUntilRootList.lists[list.parentListId], [list.parentListId, ...res])
  } else {
    let result = { [list.id]: clone }
    clone.forEach((listId, index) => {
      result[listId] = clone.slice(index + 1)
    })
    return { listList: result, orderLists: [...clone] }
  }
  return clone
}


//TODO RENAME initializeState
export function inity(currentListSection, result = null) {
  const blankList = itemsListMixin(currentListSection, inity.items)

  if (result === null) {
    result = {
      lists: { [blankList.id]: { ...blankList, parentListId: null } },
      relations: {
        itemList: {},
        listItem: {},
        listLists: { [blankList.id]: [] }
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

          let lists = {
            lists: {
              [item.list.id]: {
                ...itemsListMixin(item.list, inity.items),
                parentListId: blankList.id
              }, ...result.lists
            }
          }

          const relationsItemList = { itemList: { [item.id]: item.list.id, ...result.relations.itemList } }
          const relationsListItem = { listItem: { [item.list.id]: item.id, ...result.relations.listItem } }
          let relationsListLists = { listLists: { ...result.relations.listLists } }

          let structure = { structure: Object.assign({}, result.structure) }

          if (typeof inity.ruleStructure === "function") {
            for (let k = 0, listsItems = [...lists.lists[item.list.id].items]; k < listsItems.length; k++) {
              if (inity.ruleStructure({ ...listsItems[k] })) {// TODO if key `list` exists  remove it from argument


                // lists.lists[item.list.id].items[k]=Object.assign({},lists.lists[item.list.id].items[k],{className:`${lists.lists[item.list.id].items[k].className} item-active`})

                // lists.lists[item.list.id].items[k]=retrieveActiveItem(lists.lists[item.list.id].items[k])

//debugger
                floatUntilRootList.lists = { ...lists.lists }
                const { listList, orderLists } = floatUntilRootList(lists.lists[item.list.id], [item.list.id])
// debugger
//                 console.log(listList)
//                 console.log(result)
                relationsListLists.listLists = listList


                const itList = orderLists.slice(1)

                let keyPath = 'list exciterItem '

                for (let it = 0; it < itList.length; it++) {
                  const listId = itList[it]
                  const itemIdByListId = relationsListItem.listItem[listId]


                  //todo if(!inity.items[itemIdByListId]) exception

                  const exciter = {//TODO ?inity.ruleStructure for current item
                    ...inity.items[itemIdByListId],
                    list: {
                      ...lists.lists[listId],
                      exciterItem: null
                    }
                  }


                  const isMapExist = fromJS({
                    list: structure.structure
                  }).getIn(keyPath.trim().split(' '))
                  if(isMapExist){
                    //console.log(isMapExist.toJS().list)
                    debugger;
                  }



                  const newMap = fromJS({
                    list: structure.structure
                  }).setIn(keyPath.trim().split(' '), exciter)
                  keyPath += 'list exciterItem '
                  structure.structure = newMap.toJS().list
                }
                break
              }
            }

          }
          const relations = { relations: { ...relationsItemList, ...relationsListLists, ...relationsListItem } }
          result = inity(item.list, { ...lists, ...relations, ...structure })
        }
      }
    }
  }
  result.items = Object.assign({}, inity.items)
  return result
}

function isItemAcive(item) {
  return (typeof inity.ruleStructure === "function") && inity.ruleStructure({ ...item })
}

function retrieveActiveClassNameItem(className) {
  return className ? `${className} ${className}-active` : 'menu-infinity-item-active'
}


function itemsListMixin(list, itemsCollection) {
  const itemsIteratorResult = list.items.reduce((result, item) => {
    result.itemIdsOrder.push(item.id)

    const className = (isItemAcive({ ...item, ...itemsCollection[item.id] })) ? retrieveActiveClassNameItem(itemsCollection[item.id].className) : itemsCollection[item.id].className
    result.items.push({ ...item, ...itemsCollection[item.id], className })
    return result
  }, { itemIdsOrder: [], items: [] })

  return {
    id: list.id,
    className: list.className,
    volume: list.volume,
    axis: list.axis,
    ...itemsIteratorResult
  }
}
