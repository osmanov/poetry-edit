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
    // structure: structureSelector(state),
    // relationItemList:relationItemListSelector(state)
    relationItemList:state.relations.itemList,
    relationListLists:state.relations.listLists,
    structure: state.structure

  }
}

// let currentEl = null

class MenuInfinity extends React.Component{

  _getItems = list => {
    const {addListListsRelation,updateStructure, relationItemList}=this.props

    const {items,exciterItem}=list

    return items.map(item=>{
      return <MenuInfinityItem addListListsRelation={addListListsRelation} updateStructure={updateStructure} relationItemList={relationItemList} className={item.className} item={{...item, listId:list.id}} key={item.id}>
        {(exciterItem && exciterItem.id===item.id && this._getList(exciterItem.list)) || null}
      </MenuInfinityItem>
    })
  }

  _getList = (list,isRoot) => {
    return <MenuInfinityList axis={list.axis}  volume={list.volume} root={isRoot} className={list.className} key={list.id}>
      {this._getItems(list)}
    </MenuInfinityList>
  }

  _currentEl=null

  _mouseOver=(e)=>{
    console.log('-----------')
    console.log('_mouseOver')
    console.log('-----------')
    console.log('target-->')
    console.log(e.target)
    console.log('this._currentEl BEFORE-->')
    console.log(this._currentEl)

    if(this._currentEl) return

    const {relationItemList, relationListLists, removeListListsRelation, updateStructure, addListListsRelation,structure}=this.props

    let target=e.target

    while(target!==this.menuEl){
      if(target.tagName==='LI') break
      if(target.tagName==='UL' && target.parentNode.tagName==='LI'){

        return
      }
      target=target.parentNode
    }
    if (target === this.menuEl){
      console.log('while target is ROOT div')
      return
    }

    this._currentEl = target
    console.log('this._currentEl AFTER-->')
    console.log(this._currentEl)


    const itemId = isNaN(+this._currentEl.dataset.itemId)?this._currentEl.dataset.itemId:+this._currentEl.dataset.itemId
    const listId = isNaN(+this._currentEl.dataset.listId)?this._currentEl.dataset.listId:+this._currentEl.dataset.listId

    const isItem = itemId && listId
    if (isItem !== undefined) {
      const hasItemChildList=relationItemList[itemId]
      if(hasItemChildList !== undefined){
        const isChildListInStructure=~relationListLists[structure.id].indexOf(relationItemList[itemId])
        if (!isChildListInStructure) {
          updateStructure(itemId)
          addListListsRelation(relationItemList[itemId])
        }
      }else{
        console.log('NO LIST')

        const hasListSubLists=(relationListLists[structure.id][relationListLists[structure.id].length-1]!==listId) //current listId's index  is last in relationListLists[structure.id]?
        if(hasListSubLists){
          debugger
          removeListListsRelation(listId)
        }




        debugger
      }
    }
  }

  _mouseOut=(e)=>{
    console.log('-----------')
    console.log('_mouseOut')
    console.log('-----------')
    console.log('target-->')
    console.log(e.target)
    console.log('relatedTarget BEFORE-->')
    console.log(e.relatedTarget)
    console.log('this._currentEl-->')
    console.log(this._currentEl)

    if(!this._currentEl) return
    let relatedTarget=e.relatedTarget
    if(relatedTarget){
      while (relatedTarget){
        if(relatedTarget === this._currentEl){
          console.log('relatedTarget === this._currentEl')
          console.log('and this._currentEl is:')
          console.log(this._currentEl)
          return
        }
        if(relatedTarget.tagName === 'UL'){
          console.log('relatedTarget === UL')
          break
        }

        relatedTarget = relatedTarget.parentNode
      }
    }

    this._currentEl=null
    console.log('this._currentEl === null')
  }


  componentDidMount(){
    this.menuEl.addEventListener('mouseover',this._mouseOver)
    this.menuEl.addEventListener('mouseout',this._mouseOut)

    /*let currentEl = null
    const {relationItemList, updateStructure}=this.props
    this.menuEl.addEventListener('mouseover',function(e){
      if(currentEl) return

      let target=e.target

      while(target!==this){
        if(target.tagName==='LI') break
        target=target.parentNode
      }
      if (target === this)return

      currentEl = target



      const itemId = currentEl.dataset.itemId

      console.log(itemId)
      if (itemId && relationItemList[itemId]) {
        console.log(itemId)
        updateStructure(itemId)
      }
    })

    this.menuEl.addEventListener('mouseout',function(e){
      if(!currentEl) return

      let relatedTarget=e.relatedTarget

      if(relatedTarget){
        while (relatedTarget){
          if(relatedTarget === currentEl) return
          relatedTarget = relatedTarget.parentNode
        }
      }

      currentEl=null
    })
*/

  }

  render(){
    const {structure}=this.props

    return <div ref={ comp => { this.menuEl = comp }} >
      {this._getList(structure,true)}
    </div>
  }
}

export default connect(mapStateToProps, actionCreators)(MenuInfinity);
