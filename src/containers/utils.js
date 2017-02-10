export function spreadLists(nephews, lists) {
  let clone = lists.slice()

  for (let j = 0; j < nephews.length; j++) {
    const item = nephews[j]

    if (item.list) {

      let list = {}
      const keys = Object.keys(item.list)

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (key === 'items') {
          clone = spreadLists(item.list[key], [...clone, list])
        } else {
          list[key] = item.list[key]
        }
      }

    }
  }
  return clone
}
