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
    isHidden:this.props.isHidden
  }

  _onMouseEnter=()=>{
    this.setState({
      isHidden:true
    })
  }

  _renderChildren () {
    if(!React.Children.count(this.props.children)) return null
    const result = []
    console.log('***'+this.props.isHidden+'***')//TODO
    React.Children.forEach(this.props.children,
      (child, key) => {
        if (child) result.push(React.cloneElement(child, Object.assign({}, child.props, {isHidden: this.state.isHidden, key})))
      })

    return result
  }

  render() {
    const { onMouseDown, isActive, label, className} = this.props
    return (
      <Wrapper onMouseDown={onMouseDown} onMouseEnter={this._onMouseEnter} className={className}>
        <Label isActive={isActive}>
          {label}
        </Label>
        {this._renderChildren()}
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

