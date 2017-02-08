import React from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './redux'
import { createSelector } from 'reselect'
import MenuInfinityItem from './MenuInfinityItem'
import MenuInfinityList from './MenuInfinityList'

const listSelector = state => state.list.items
const itemsSelector = state => state.items
const enteredSelector = state => state.itemOnEnter

const subtotalSelector = createSelector(
  listSelector,
  itemsSelector,
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
//set item to entred

    return null
  }
)



const mapStateToProps = state => {
  return {
    items:subtotalSelector(state),
    list:state.list,
    entered:entSelector(state)
  }
}

class MenuInfinity extends React.Component{

  _getItems = () => {
    const {items, itemOnEnter}=this.props
    return items.map((item,key)=>{
      return <MenuInfinityItem className={item.item.className} onMouseEnter={itemOnEnter} item={item} key={key}/>
    })
  }

  render(){
    return <MenuInfinityList className={this.props.list.className}>
      {this._getItems()}
    </MenuInfinityList>
  }
}

export default connect(mapStateToProps, actionCreators)(MenuInfinity);
