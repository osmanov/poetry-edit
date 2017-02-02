import React from 'react'
import { Editor, Raw } from 'slate'
import Portal from 'react-portal'
import initialState from './state.json'

const schema = {
  marks: {
    bold: props => <strong>{props.children}</strong>,
    code: props => <code>{props.children}</code>,
    italic: props => <em>{props.children}</em>,
    underlined: props => <u>{props.children}</u>,
  }
}

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

  renderMenu = () => {
    return (
      <Portal isOpened onOpen={this.onOpen}>
        <div>
          {this.renderMarkButton('bold', 'format_bold','red')}
          {this.renderMarkButton('italic', 'format_italic','green')}

          {this.renderMarkButton('code', 'code','orange')}
          {this.renderMarkButton('fake', this._getFaker('FAKER'),'pink')}
        </div>
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
    const isActive = this.hasMark(type)

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

  hasMark = (type) => {
    const { state } = this.state
    return state.marks.some(mark => mark.type == type)
  }

  renderEditor = () => {
    return (
      <div className="editor">
        <Editor
          schema={schema}
          state={this.state.state}
          onChange={this.onChange}
        />
      </div>
    )
  }

  render() {
    console.log(this.props.theme)
    return (
      <div>
        {this.renderMenu()}
        {this.renderEditor()}
      </div>
    );
  }
}

EditorMenu.propTypes = {};
EditorMenu.defaultProps = {};

export default EditorMenu;
