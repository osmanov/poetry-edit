import React from 'react'
import { Editor, Raw } from 'slate'
import position from 'selection-position'
import Portal from 'react-portal'
import initialState from './state.json'
import MenuInfinityContainer from 'containers/MenuInfinityContainer'

const items={
  0:{
    id:0,
    label:<i className="fa fa-bold" aria-hidden="true"></i>,
    className:'item',
    mark:'bold'
  },
  1: {
    id:1,
    label:<i className="fa fa-italic" aria-hidden="true"></i>,
    className:'item',
    mark:'italic'
  },
  2:{
    id:2,
    label:<i className="fa fa-bookmark-o" aria-hidden="true"></i>,
    className:'item',
  },
  3:{
    id:3,
    label:<i className="fa fa-comment-o" aria-hidden="true"></i>,
    className:'item',
  },
  4:{
    id:4,
    label:<i className="fa fa-ellipsis-h" aria-hidden="true"></i>,
    className:'item',
  },
  5:{
    id:5,
    label:<i className="fa fa-align-right" aria-hidden="true"></i>,
    className:'item1',
    mark:'alignRight'
  },
  6:{
    id:6,
    label:<i className="fa fa-align-center" aria-hidden="true"></i>,
    className:'item1',
    mark:'alignCenter'
  },
  7:{
    id:7,
    label:<i className="fa fa-align-left" aria-hidden="true"></i>,
    className:'item',
    mark:'alignLeft'
  },
  8:{
    id:8,
    label: <span>RENAT</span>,
    className:'item',
  }
}


const list ={
  id:'L0',
  className:'menuContainer',
  volume:'up',
  axis:'x',
  items: [
    {
      id: 8
    },
    {
      id: 2,

      list: {
        id:'L1',
        className:'menuContainer2',
        volume:'down',
        axis:'y',
        items:[
          {
            id: 3,
            list:{
              id:'L520',
              className:'menuContainer2',
              volume:'up',
              axis:'x',
              items:[
                {
                  id:0
                }
              ]
            }

          },
          {
            id: 4,
            list: {
              id:'L2',
              className:'menuContainer2',
              volume:'up',
              axis:'x',
              items:[
                {
                  id: 5,
                  list: {
                    id:'L3',
                    className:'menuContainer2',
                    volume:'down',
                    axis:'y',
                    items:[
                      {
                        id: 1
                      },{
                        id: 6
                      }
                    ]
                  }
                },
                {
                  id: 7
                }
              ]
            }
          }
        ]
      }
    }
  ]
}

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

  onClickMark = (e, item,list) => {
    let { state } = this.state
console.log(item)
    if(item.mark){
      state = state
        .transform()
        .toggleMark(item.mark)
        .apply()
      this.setState({ state })
    }else{
      alert('CUSTOM')
       console.log('custom WITHOUT list')
    }
  }



  renderMenu = () => {
    const { state:{isBlurred, isCollapsed} } = this.state
    const isOpened=!(isBlurred || isCollapsed)

    return (
      <Portal isOpened={isOpened} onOpen={this.onOpen}>
        <MenuInfinityContainer
          initStructureByRule={(itemWithList)=>{
            // if selected=> to init structure

//console.log(itemWithList)
//console.log(itemWithList.mark)
//console.log(this._hasMark(itemWithList.mark))

  return itemWithList.mark? this._hasMark(itemWithList.mark):false

            return true //TODO or false
          }}
          selectItemRule={(item,list)=>{//TODO THINK ABOUT IT cause our item can be custom...
          //set selected/unselected  rule in spreadLIst before initStructure
            /*
            * maybe here we will have couple of rules
             * if item has mark one rule
             * if it doesn't have it means that is custom and another rule..
            * */
            return true //TODO or false
          }}
          list={list}
          items={items}
          structureOnUpdate={()=>{}}
          itemOnClick={this.onClickMark}/>
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







