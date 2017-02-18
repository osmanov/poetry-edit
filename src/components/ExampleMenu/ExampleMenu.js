import React from 'react'
import { Editor, Raw } from 'slate'
import position from 'selection-position'
import Portal from 'react-portal'
import initialState from './state.json'
import MenuInfinityContainer from 'containers/MenuInfinityContainer'

class ExampleMenu extends React.Component {
  state = {
    state: Raw.deserialize(initialState, { terse: true })
  }

  onOpen = (portal) => {
    this.setState({ menu: portal.firstChild.firstChild })
  }

  onChange = (state) => {
    this.setState({ state })
  }

  componentDidUpdate =()=>{
    this.updateMenu()
  }

  componentDidMount = () => {
    this.updateMenu()
  }

  _hasMark = (type) => {
    const { state } = this.state
    return state.marks.some(mark => mark.type == type)
  }

  onClickMark = (e, item) => {
    let { state } = this.state


    if(item.mark){
      state = state
        .transform()
        .toggleMark(item.mark)
        .apply()
      this.setState({ state })
    }else{
       console.log('custom WITHOUT list')
    }
  }

  renderMenu = () => {
    const { state:{isBlurred, isCollapsed} } = this.state
    const isOpened=!(isBlurred || isCollapsed)

    return (
      <Portal isOpened={isOpened} onOpen={this.onOpen}>
        <MenuInfinityContainer itemOnClick={this.onClickMark}/>
      </Portal>
    )
  }


  updateMenu = () => {
    const { menu, state } = this.state
    if (!menu || state.isBlurred || state.isCollapsed) return
    const rect = position()
    menu.style.top = `${rect.bottom + window.scrollY}px`
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

ExampleMenu.propTypes = {
  schema : React.PropTypes.object.isRequired
};
ExampleMenu.defaultProps = {};

export default ExampleMenu;







