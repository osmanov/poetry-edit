import React from 'react'
import { Editor, Raw } from 'slate'
import position from 'selection-position'
import Portal from 'react-portal'
import styled ,{css}from 'styled-components'
import initialState from './state.json'
import MenuList from 'components/MenuList'
import MenuItem from 'components/MenuItem'


/*
*   ${(props)=>{

 if(props.sub){
 if(props.axis === 'y'){
 return css`
 top:
 `
 }
 }
 }}
* */
const Wrapper = styled.section`
  position:absolute;

`


class EditorMenu extends React.Component {
  state = {
    state: Raw.deserialize(initialState, { terse: true })
  }

  onOpen = (portal) => {
    this.setState({ menu: portal.firstChild })
  }

  onChange = (state) => {
    this.setState({ state })
  }

  componentDidUpdate =()=>{
    this.updateMenu()
    this._depth=0
  }

  componentDidMount = () => {
    this.updateMenu()
    this._depth=0
  }

  _hasMark = (type) => {
    const { state } = this.state
    return state.marks.some(mark => mark.type == type)
  }

  onClickMark = (e, type, withList) => {
     e.preventDefault()
     e.persist()
    e.stopPropagation()//TODO remove it and check active class
    let { state } = this.state
    // console.log(e.target)
    // console.log(type)
    // console.log(withList)


    if(type){
      state = state
        .transform()
        .toggleMark(type)
        .apply()
      this.setState({ state })
    }else if(withList){
      // console.log('custom WITH list')
      // console.log(type)
    }else{
      // console.log('custom WITHOUT list')
    }
  }



  _getItems = (items, depth) => {
    console.log(depth)
    return items.map((item,key)=>{
      const isActive = item.mark && this._hasMark(item.mark) //in edit current state

      const props={label:item.label,onMouseDown: e =>this.onClickMark(e, item.mark,item.list),className:isActive?`${item.className} ${item.className}-active`:`${item.className}`}

      return <MenuItem {...props} key={depth+''+key}>
        {item.list && this._getList(Object.assign({isHidden: false}, item.list))}
      </MenuItem>
    })
  }

  _depth=0

  _getList=({items,...other})=>{
    return <MenuList {...other}>
      {this._getItems(items,this._depth++)}
    </MenuList>
  }

  renderMenu = () => {
    const { state:{isBlurred, isCollapsed} } = this.state
    const isOpened=!(isBlurred || isCollapsed)

    {/*<Portal isOpened={isOpened} onOpen={this.onOpen}>*/}
    return (
      <Portal isOpened={isOpened} onOpen={this.onOpen}>
          {this._getList(Object.assign({isHidden:false,root:true},this.props.provider))}
      </Portal>
    )
  }



  updateMenu = () => {
    const { menu, state } = this.state
    if (!menu || state.isBlurred || state.isCollapsed) return
    const rect = position()
    menu.style.top = `${rect.bottom + window.scrollY}px`
    debugger
    menu.style.left = `${rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2}px`
  }

  renderEditor = () => {
    return (
      <div className="editor">
        <Editor
          schema={this.props.schema}
          state={this.state.state}
          onChange={this.onChange}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderMenu()}
        {this.renderEditor()}
      </div>
    );
  }
}

EditorMenu.propTypes = {
  provider : React.PropTypes.object.isRequired,
  schema : React.PropTypes.object.isRequired
};
EditorMenu.defaultProps = {};

export default EditorMenu;


/*
* {this.renderMarkButton('bold', 'format_bold','red')}
 {this.renderMarkButton('italic', 'format_italic','green')}

 {this.renderMarkButton('code', 'code','orange')}
 {this.renderMarkButton('fake', this._getFaker('FAKER'),'pink')}
* */




