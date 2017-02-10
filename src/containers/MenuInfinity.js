import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './redux'
import { createSelector } from 'reselect'
import MenuInfinityItem from './MenuInfinityItem'
import MenuInfinityList from './MenuInfinityList'
/*
const listSelector = state => state.list.items
const itemSelector = state => state.items
const enteredSelector = state => state.itemOnEnter

const subtotalSelector = createSelector(
  listSelector,
  itemSelector,
  (list,items)=>{
    return list.map(item=>{
      return{
        item:items[item.id],
        list:item.list||null
      }
    })
  }
)

const entSelector = createSelector(
  subtotalSelector,
  enteredSelector,
  listSelector,
  (items,entered,list)=>{
    console.log(entered)
    console.log('hello')
    return null
  }
)*/

const itemsSelector = state => state.items
const structureSelector = state => state.structure

const currentListsSelector = createSelector(
  itemsSelector,
  structureSelector,
  (items,structure)=>{



    return structure.map(list => {
      const listItems=list.items.map(item=>{
       return {
         ...items[item.id],
         childList:item.list || null
       }
      })
      return Object.assign({},list,{items:listItems})
    })
  }
)

const mapStateToProps = state => {
  return {
    // structure:currentListsSelector(state)
    structure: state.structure
    //lists:state.lists
  }
}

class MenuInfinity extends React.Component{

  _getItems = (items) => {
    const {addNephewsToLists, addList}=this.props
    return items.map(item=>{
      return <MenuInfinityItem className={item.className} onMouseEnter={()=>{
        if(item.childList){
          addNephewsToLists(item.childList.id)
          addList(item.childList)
        }

      }} item={item} key={item.id}/>
    })
  }

  _getList = (list,isRoot) => {//TODO from here
    return <MenuInfinityList root={isRoot} className={list.className} key={list.id}>
      {this._getItems(list.items)}
    </MenuInfinityList>
  }

  render(){
    console.log(this.props.structure)
    return null

    const {lists}=this.props

    return <div>
      {lists.map(list => {
        return this._getList(list,true)
      })}
    </div>



  }
}

export default connect(mapStateToProps, actionCreators)(MenuInfinity);
