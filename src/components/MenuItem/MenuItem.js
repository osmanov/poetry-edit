import React from 'react';
import  styled  from 'styled-components';


const Wrapper = styled.li`
    position:relative;
    cursor:pointer;
`

const Label = styled.div`
    background:${props => props.isActive ? 'orange': ''}
`

class MenuItem extends React.Component {

  state={
    //children:this.props.children || null
    show:false
  }

  _onMouseEnter=()=>{
    console.log('enter')
    this.setState({
      show:true
      //children: this._toggleChildrenVisibility(false)
    })
  }

  _onMouseLeave=()=>{
    console.log('leave')
    this.setState({
      show:false
    })
  }

  _toggleChildrenVisibility (visibility) {
    if(!React.Children.count(this.props.children)) return null
    const result = []

    React.Children.forEach(this.props.children,
      (child, key) => {
        if (child) result.push(React.cloneElement(child, Object.assign({}, child.props, {isHidden: visibility, key})))
      })

    return result
  }

  render() {
    const { onMouseDown, isActive, label, className} = this.props
    return (
      <Wrapper onMouseDown={onMouseDown} onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} className={className}>
        <Label isActive={isActive}>
          {label}
        </Label>
        {/*this.state.children*/}
        {this.state.show && this.props.children}
      </Wrapper>
    );
  }
}


MenuItem.propTypes = {
  label: React.PropTypes.any.isRequired,
  onMouseDown: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  children: React.PropTypes.element,
  isActive: React.PropTypes.bool
}

export default MenuItem;

