import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './redux'
import { createSelector } from 'reselect'
import MenuInfinityItem from './MenuInfinityItem'
import MenuInfinityList from './MenuInfinityList'

const itemsSelector = state => state.items
const listsSelector = state => state.lists
const structureSelector = state => state.structure
const relationItemListSelector = state => state.relations.itemList
const relationListListsSelector = state => state.relations.listLists
// const listSelector = state => state.list

const fillItemsListsSelector = createSelector(
  itemsSelector,
  listsSelector,
  (items,lists)=>{
    return lists.map(list=>{
      const filledItems=list.itemIdsOrder.map(id=>items[id])
      return {...list, items: filledItems}
    })
  }
)

const currentListsSelector = createSelector(
  itemsSelector,
  fillItemsListsSelector,
  relationItemListSelector,
  relationListListsSelector,
  structureSelector,
  (items, lists, relationItemList, relationListLists, structure)=> {
    if(structure.exciterItem===null){
      return lists[structure.id]
    }

//     structure
//
// debugger
    /*
    * list: {
     id:0,
     exciterItem:{
     id:2,
     list:{
     id:1,
     exciterItem:null
     }
     },
     }
    * */

    /*function foo(list,res) {
      const structure=Object.keys(list)
      for(let i=0;i<structure.length;i++){
        const key=structure[i]
        if(list[key] && structure[i]==='exciterItem'){
          foo(list[key])
        }else{

        }
      }
    }*/

    return {}
  }
)

const mapStateToProps = state => {
  return {
    structure: structureSelector(state),
    relationItemList:relationItemListSelector(state)
  }
}

class MenuInfinity extends React.Component{

  _getItems = (items,exciterItem) => {
    const {addListListsRelation,updateStructure, relationItemList}=this.props

    return items.map(item=>{
      return <MenuInfinityItem addListListsRelation={addListListsRelation} updateStructure={updateStructure} relationItemList={relationItemList} className={item.className} item={item} key={item.id}>
        {(exciterItem && exciterItem.id===item.id && this._getList(exciterItem.list)) || null}
      </MenuInfinityItem>
    })
  }

  _getList = (list,isRoot) => {
    return <MenuInfinityList axis={list.axis}  volume={list.volume} root={isRoot} className={list.className} key={list.id}>
      {this._getItems(list.items,list.exciterItem)}
    </MenuInfinityList>
  }

  render(){
    const {structure}=this.props

    return this._getList(structure,true)
  }
}

export default connect(mapStateToProps, actionCreators)(MenuInfinity);
