export function initialize(list, prevSection = null) {
  if (prevSection = null) {
    prevSection = spotRootSection()
  }
}

export function spotRootSection() {
  const matchedList = matchItemsByListLevel(initialize.schema)
  return {
    lists: {[matchedList.id]: {...matchedList, parentListId: null}},
    relations: {
      itemList: {},
      listItem: {},
      listLists: {[matchedList.id]: []}
    },
    structure: {
      ...matchedList,
      exciterItems: []
    },
  }
}

function isItemActive(item) {
  return (typeof initialize.ruleStructure === "function") && initialize.ruleStructure(item)
}

function retrieveActiveClassNameItem(className) {
  return className ? `${className} ${className}-active` : 'menu-infinity-item-active'
}

/**
 * @param list {object} iteratable level of list
 * @returns {object} level's section
 */
export function matchItemsByListLevel(list) {
  const {id, className, volume, axis, items} = list

  const currentSectionItems = items.reduce((storage, item) => {
    const initializedItem = initialize.items[item.id]
    const className = (isItemActive({...item, ...initializedItem})) ? retrieveActiveClassNameItem(initializedItem.className) : initializedItem.className
    storage.items.push({...item, ...initialize.items[item.id], className})
    storage.itemIdsOrder.push(item.id)
    return storage
  }, {itemIdsOrder: [], items: []})

  return {
    id,
    className,
    volume,
    axis,
    ...currentSectionItems
  }
}
