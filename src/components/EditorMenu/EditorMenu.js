import React from 'react'
import { Editor, Raw } from 'slate'
import Portal from 'react-portal'
import initialState from './state.json'
import MenuList from 'components/MenuList'
import MenuItem from 'components/MenuItem'

class EditorMenu extends React.Component {
  state = {
    state: Raw.deserialize(initialState, { terse: true })
  }

  onOpen(){
    console.log('OPEN')
  }

  onChange = (state) => {
    this.setState({ state })
  }

  _pressTimer=null


  _getFaker=(text)=>{
    return (color,isActive)=><span>{text}{isActive && this.renderMarkButton('underlined', 'format_underlined','blue')}</span>
  }

  _hasMark = (type) => {
    const { state } = this.state
    return state.marks.some(mark => mark.type == type)
  }

  _getItems = items => {
    return items.map((item,key)=>{
      const isEdit = item.mark && this._hasMark(item.mark) //in edit current state

      const onMouseDown = e => {
        e.persist()

        this._pressTimer=setTimeout(()=> {
          //this.onClickMark(e, type)
        },1000)
      }

      const props={isEdit,label:item.label,onMouseDown}
      return <MenuItem {...props} key={key}>
        {item.list && this._getList(item.list)}
      </MenuItem>
    })
  }

  _getList=({items, ...other})=>{
    return <MenuList {...other}>
      {this._getItems(items)}
    </MenuList>
  }

  renderMenu = () => {
    return (
      <Portal isOpened onOpen={this.onOpen}>
          {this._getList(this.props.provider)}
      </Portal>
    )
  }

  onClickMark = (e, type,isRemoveAction) => {
    e.preventDefault()
    if(e.persist)e.persist()
    let { state } = this.state
    console.log(e.target)
    console.log(e.target.classList.contains('activator'))

    const isFakerChild=e.target.classList.contains('activator')

    if(isFakerChild){
      return
    }

    state = state
      .transform()

    if(isRemoveAction){
      state = state
        .removeMark(type)
    }else{
      state = state
        .toggleMark(type)
    }
    state=state.apply()

    this.setState({ state })
  }

  renderMarkButton(type, icon,color){
    const isActive = this._hasMark(type)

    const onMouseDown = e => {
      e.persist()

      this._pressTimer=setTimeout(()=> {
        this.onClickMark(e, type)
      },1000)
    }

    /*document.addEventListener('mouseup',(e)=>{
      clearTimeout(this._pressTimer)
      this.onClickMark(e, type,true)
    })*/
    const isFaker=(typeof icon === "function")

    return <span data-active={isActive} style={{background:color}} className={isFaker && 'faker'} onMouseDown={onMouseDown}>{isFaker?icon(color,isActive):icon}</span>
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
