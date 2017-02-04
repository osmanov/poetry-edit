import React from 'react'
import { Editor, Raw } from 'slate'
import position from 'selection-position'
import Portal from 'react-portal'
import styled from 'styled-components'
import initialState from './state.json'
import MenuList from 'components/MenuList'
import MenuItem from 'components/MenuItem'

const schema = {
  marks: {
    bold: props => <strong>{props.children}</strong>,
    code: props => <code>{props.children}</code>,
    italic: props => <em>{props.children}</em>,
    underlined: props => <u>{props.children}</u>,
  }
}

const Wrapper = styled.section`
  position:absolute;
  top:0;
  left:0;
  visibility:${props=>props.isHidden?'hidden':'visible'}
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

  componentDidUpdate (){
    this.updateMenu()
  }

  _hasMark = (type) => {
    const { state } = this.state
    return state.marks.some(mark => mark.type == type)
  }

  onClickMark = (e, type) => {
    e.preventDefault()
    e.persist()
    let { state } = this.state

    if(type){
      state = state
        .transform()
        .toggleMark(type)
        .apply()
      this.setState({ state })
    }else{
      console.log('HELLO')
    }


  }

  _getItems = items => {
    return items.map((item,key)=>{
      const isActive = item.mark && this._hasMark(item.mark) //in edit current state

      const props={isActive,label:item.label,onMouseDown: e =>this.onClickMark(e, item.mark)}
      return <MenuItem {...props} key={key}>
        {item.list && this._getList(Object.assign(item.list,{isHidden: true}))}
      </MenuItem>
    })
  }

  _getList=({items, ...other})=>{
    return <MenuList {...other}>
      {this._getItems(items)}
    </MenuList>
  }

  renderMenu = () => {
    const { state:{isBlurred, isCollapsed} } = this.state

    return (
      <Portal isOpened onOpen={this.onOpen}>
          <Wrapper isHidden={isBlurred || isCollapsed}>
            {this._getList(this.props.provider)}
          </Wrapper>
      </Portal>
    )
  }



  updateMenu = () => {
    const { menu, state } = this.state
    if (!menu || state.isBlurred || state.isCollapsed) return

    const rect = position()
    menu.style.top = `${rect.top + window.scrollY - menu.offsetHeight}px`
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
