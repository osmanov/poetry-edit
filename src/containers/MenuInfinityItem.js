import React from 'react'
import  styled  from 'styled-components'


const Wrapper = styled.li`
    position:relative;
    cursor:pointer;
`


/*
* onMouseEnter={()=>{
 console.log(item.id)
 if(this.props.relationItemList[item.id]){



 console.log(exciterItem)
 debugger
 const listId=this.props.relationItemList[item.id]
 updateStructure(item.id)
 addListListsRelation(listId)
 }

 }}
* */

class MenuItem extends React.Component {

  _onMouseLeave=(e)=>{

  }

  _onMouseEnter=(e)=>{
    e.preventDefault()
    e.persist()
    e.stopPropagation()
    debugger
    console.log(e.target)
    console.log(this.props.item.id)
    console.log(e)
    if(this.props.relationItemList[this.props.item.id]){
      this.props.updateStructure(this.props.item.id)
    }
  }

  render() {
    const { item, className} = this.props

    return (
      <Wrapper onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} className={className}>
        <div>
          {item.label}
        </div>
        {this.props.children}
      </Wrapper>
    );
  }
}


MenuItem.propTypes = {
  className: React.PropTypes.string,
  item: React.PropTypes.object.isRequired,
  children: React.PropTypes.element,
}

export default MenuItem;

