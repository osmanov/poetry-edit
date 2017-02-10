export function spreadLists(nephews, result) {
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
